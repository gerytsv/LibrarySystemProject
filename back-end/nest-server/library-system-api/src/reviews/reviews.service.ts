import { Injectable, BadRequestException } from '@nestjs/common';
import { Review } from '../database/entities/reviews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/users.entity';
import { Book } from '../database/entities/books.entity';
import { ShowReviewDTO } from './models/show-review..dto';
import { UpdatedReviewDTO } from './models/updated-review.dto';
import { ResponseMessegeDTO } from './models/messege.dto';
import { LikeReviewDTO } from './models/like-review.dto';

@Injectable()
export class ReviewsService {
    public constructor(
        @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>
    ) {}

    public async getAllBookReviews(bookId: string): Promise<ShowReviewDTO[]> {
        const book = await this.booksRepository.findOne({where: {id: bookId}});
        if (!book) {
            throw new BadRequestException('Book is not found');
        }
        const reviews = await book.reviews;
        const reviewsToShow = reviews.map(async review => {
            const reviewer = await review.user;
            const reviewedBook = await review.book;
            return {
                id: review.id ,
                user: reviewer.id,
                book: reviewedBook.id,
                content: review.content,
                likes: review.likes,
                flags: review.flags,
                createdOn: review.createdOn
            };
        });
        return Promise.all(reviewsToShow);
    }

    public async getAllUserReviews(userId: string): Promise<ShowReviewDTO[]> {
        const user = await this.usersRepository.findOne({where: {id: userId}});
        if (!user) {
            throw new BadRequestException('User is not found');
        }
        const reviews = await user.reviews;
        const reviewsToShow = reviews.map(async review => {
            const reviewer = await review.user;
            const reviewedBook = await review.book;
            return {
                id: review.id ,
                user: reviewer.id,
                book: reviewedBook.id,
                content: review.content,
                likes: review.likes,
                flags: review.flags,
                createdOn: review.createdOn
            };
        });
        return Promise.all(reviewsToShow);
    }

    public async createReview(userID: string, bookID: string , content: string): Promise<ShowReviewDTO|BadRequestException> {
        const user  = await this.usersRepository.findOne({where: { id: userID, isDeleted: false}});
        if (!user) {
            return new BadRequestException('User is not found');
        }
        const book =  await this.booksRepository.findOne({where: {id: bookID, isDeleted: false}});
        if (!book) {
            return new BadRequestException('Book is not found');
        }
        if (!await this.isBookRead(user, book)) {
            return new BadRequestException('Book has not been read by the user');
        }
        const review = {
            content ,
        };
        const reviewEntity = this.reviewsRepository.create(review);
        reviewEntity.user = Promise.resolve(user);
        reviewEntity.book = Promise.resolve(book);

        const savedReview = await this.reviewsRepository.save(reviewEntity);
        const reviewer = await savedReview.user;
        const reviewedBook = await savedReview.book;

        return {
            id: savedReview.id,
            user: reviewer.id,
            book: reviewedBook.id,
            content: savedReview.content,
            likes: savedReview.likes,
            flags: savedReview.flags,
            createdOn: savedReview.createdOn
        };
    }

    public async editReviewContent(userId: string , reviewId: string, newContent: string): Promise<ResponseMessegeDTO|BadRequestException> {
        const review = await this.reviewsRepository.findOne({where: {id: reviewId, isDeleted: false}});
        if (!review) {
            return new BadRequestException('No such review');
        }
        const reviewOwner = await review.user;
        if (reviewOwner.id !== userId) {
            return new BadRequestException('This user can\'t edit the review');
        }

        review.content = newContent;
        const updatedReview = await this.reviewsRepository.save(review);

        return {
            messege: 'Review Updated'
        };
    }

    public async removeReview(userId: string, reviewId: string): Promise<ResponseMessegeDTO|BadRequestException> {
        const user = await this.usersRepository.findOne({where: { id: userId, isDeleted: false }});
        const userReviews = await user.reviews;
        const review = await this.reviewsRepository.findOne({where: { id: reviewId, isDeleted: false}});
        if (!user) {
            throw new BadRequestException('User is not found');
        }
        if (!review) {
            throw new BadRequestException('Review is not found');
        }
        if (!userReviews.some( item => item.id === reviewId)) {
            throw new BadRequestException('The review doesnt belong to this user');
        }

        review.isDeleted = true;
        this.reviewsRepository.save(review);

        return {
            messege: 'Review Deleted'
        };
    }

    public async voteReview(reviewId: string , likes: number ): Promise<ResponseMessegeDTO|BadRequestException> {
        const review = await this.reviewsRepository.findOne({where: { id: reviewId, isDeleted: false}});
        if (!review) {
            throw new BadRequestException('Review not found');
        }
        ( likes > 0 ) ? review.likes++ : review.likes--;
        this.reviewsRepository.save(review);
        return (likes > 0 ) ? { messege: 'Review liked'} : {messege: 'Review unliked'};
    }

    public async flagReview(reviewId: string , flags: number ): Promise<ResponseMessegeDTO|BadRequestException> {
        const review = await this.reviewsRepository.findOne({where: { id: reviewId, isDeleted: false}});
        if (!review) {
            throw new BadRequestException('Review not found');
        }
        ( flags > 0 ) ? review.flags++ : review.flags--;
        this.reviewsRepository.save(review);
        return (flags > 0 ) ? { messege: 'Review flaged'} : {messege: 'Review unflaged'};
    }

    private async isBookRead(user: User, book: Book) {
        const books = await user.borrowedBooks;
        return books.some(item => item.id === book.id);
    }
}
