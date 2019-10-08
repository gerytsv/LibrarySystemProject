import { Injectable, BadRequestException } from '@nestjs/common';
import { Review } from '../database/entities/reviews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { User } from '../database/entities/users.entity';
import { Book } from '../database/entities/books.entity';
import { ResponseMessegeDTO } from './models/messege.dto';

@Injectable()
export class ReviewsService {
    public constructor(
        @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>
    ) {}

    public async getAllBookReviews(bookId: string) {
        const book = await getManager().
        createQueryBuilder(Book, 'book')
        .leftJoinAndSelect('book.reviews', 'review', 'review.isDeleted = :isDeleted', { isDeleted: false })
        .leftJoinAndSelect('review.user', 'user')
        .where('book.id = :id', { id: bookId })
        .getOne();
        if (!book) {
            throw new BadRequestException('Book not found');
        }
        return await book.reviews;
    }

    public async getAllUserReviews(userId: string) {
        const user = await getManager().
        createQueryBuilder(User, 'user')
        .leftJoinAndSelect('user.reviews', 'review', 'review.isDeleted = :isDeleted', { isDeleted: false })
        .leftJoinAndSelect('review.book', 'book')
        .where('user.id = :id', { id: userId })
        .getOne();
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return user.reviews;
    }

    public async create(userID: string, bookID: string , content: string) {
        const user  = await this.usersRepository.findOne({where: { id: userID, isDeleted: false}});
        if (!user) {
            return new BadRequestException('User not found');
        }
        const book =  await this.booksRepository.findOne({where: {id: bookID, isDeleted: false}});
        if (!book) {
            return new BadRequestException('Book not found');
        }
        if (!await this.isBookRead(user, book)) {
            return new BadRequestException('The book has not been read by the user');
        }
        const review = {
            content ,
        };
        const oldReview = await this.reviewsRepository.findOne({ where: {user , book}});
        const reviewEntity = this.reviewsRepository.create(review);
        reviewEntity.user = Promise.resolve(user);
        reviewEntity.book = Promise.resolve(book);
        if (oldReview) {
            reviewEntity.id = oldReview.id;
        }
        return await this.reviewsRepository.save(reviewEntity);
    }

    public async editContent(userId: string , reviewId: string, newContent: string) {
        const review = await this.reviewsRepository.findOne({where: {id: reviewId, isDeleted: false}});
        if (!review) {
            return new BadRequestException('No such review');
        }
        const reviewOwner = await review.user;
        if (reviewOwner.id !== userId) {
            return new BadRequestException('This user can\'t edit the review');
        }

        review.content = newContent;

        return await this.reviewsRepository.save(review);

    }

    public async remove(userId: string, reviewId: string) {
        const review = await this.reviewsRepository.findOne({where: { id: reviewId, isDeleted: false},
        relations: ['user']});
        if ( !review ) {
            throw new BadRequestException('Review doesnt exist');
        }
        const user = await review.user;
        if ( !user || user.id !== userId  ) {
            throw new BadRequestException('This user can\'t delete the review');
        }
        console.log(review);
        review.isDeleted = true;
        this.reviewsRepository.save(review);
        return {
            messege: 'Review Deleted'
        };
    }

    public async like(reviewId: string , likes: number) {
        const review = await this.reviewsRepository.findOne({where: { id: reviewId, isDeleted: false}});
        if (!review) {
            throw new BadRequestException('Review not found');
        }
        ( likes > 0 ) ? review.likes++ : review.likes--;
        this.reviewsRepository.save(review);
        return (likes > 0 ) ? { messege: 'Review liked'} : {messege: 'Review unliked'};
    }

    public async flag(reviewId: string , flags: number) {
        const review = await this.reviewsRepository.findOne({where: { id: reviewId, isDeleted: false}});
        if (!review) {
            throw new BadRequestException('Review not found');
        }
        ( flags > 0 ) ? review.flags++ : review.flags--;
        this.reviewsRepository.save(review);
        return (flags > 0 ) ? { messege: 'Review flaged'} : {messege: 'Review unflaged'};
    }

    private async isBookRead(user: User, book: Book) {
        const books = await user.returnedBooks;
        return books.some(item => item.id === book.id);
    }
}
