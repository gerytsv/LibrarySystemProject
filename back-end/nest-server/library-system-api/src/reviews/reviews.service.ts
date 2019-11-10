import { Injectable, BadRequestException } from '@nestjs/common';
import { Review } from '../database/entities/reviews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { User } from '../database/entities/users.entity';
import { Book } from '../database/entities/books.entity';
import { ResponseMessegeDTO } from './models/messege.dto';
import { SystemError } from '../common/exceptions/system.error';
import { isBookRead } from '../common/util-services/is-book-read';
import { isAdmin } from '../common/util-services/is-admin';

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
            throw new SystemError('Book not found', 400);
        }
        return book.reviews;
    }

    public async getAllUserReviews(userId: string) {
        const user = await getManager().
        createQueryBuilder(User, 'user')
        .leftJoinAndSelect('user.reviews', 'review', 'review.isDeleted = :isDeleted', { isDeleted: false })
        .leftJoinAndSelect('review.book', 'book')
        .where('user.id = :id', { id: userId })
        .getOne();
        if (!user) {
            throw new SystemError('User not found', 400);
        }
        return user.reviews;
    }

    public async create(userID: string, bookID: string , content: string) {
        const user  = await this.usersRepository.findOne({where: { id: userID, isDeleted: false}});
        if (!user) {
            throw new SystemError('User not found', 400);
        }
        const book =  await this.booksRepository.findOne({where: {id: bookID, isDeleted: false}});
        if (!book) {
            throw new SystemError('Book not found', 400);
        }
        if (!isAdmin(user)) {
            if (!await isBookRead(user, book)) {
                throw new SystemError('The book has not been read by the user', 400);
            }
        }
        const review = {
            content ,
        };
        const oldReview = await this.reviewsRepository.findOne({ where: {user , book}});
        const reviewEntity = this.reviewsRepository.create(review);
        reviewEntity.user = Promise.resolve(user);
        reviewEntity.book = Promise.resolve(book);
        reviewEntity.votes = Promise.resolve([]);
        if (oldReview) {
            reviewEntity.id = oldReview.id;
        }
        reviewEntity.isDeleted = false;
        return await this.reviewsRepository.save(reviewEntity);
    }

    public async editContent(userId: string , reviewId: string, newContent: string) {
        const review = await this.reviewsRepository.findOne({where: {id: reviewId, isDeleted: false}});
        if (!review) {
            throw new SystemError('No such review', 400);
        }
        const reviewOwner = await review.user;
        if (!isAdmin(reviewOwner)) {
            if (reviewOwner.id !== userId) {
                throw new SystemError('This user can\'t edit the review', 400);
            }
        }
        review.content = newContent;

        return await this.reviewsRepository.save(review);

    }

    public async remove(userId: string, reviewId: string) {
        const review = await this.reviewsRepository.findOne({where: { id: reviewId, isDeleted: false},
        relations: ['user']});
        if ( !review ) {
            throw new SystemError('Review doesnt exist', 400);
        }
        const user = await review.user;
        if (!isAdmin(user)) {
            if ( !user || user.id !== userId  ) {
                throw new SystemError('This user can\'t delete the review', 400);
            }
        }
        review.isDeleted = true;
        this.reviewsRepository.save(review);
        return {
            messege: 'Review Deleted'
        };
    }

    public async getReviewedBooks(userId: string) {
            const user = await this.usersRepository.findOne({
              where: { id: userId, isDeleted: false },
            });
            const reviews = await this.reviewsRepository.find({where: {user},
              relations: ['book']});
            const books = reviews.map(item => item.book);
            return await Promise.all(books);
          }
 }
