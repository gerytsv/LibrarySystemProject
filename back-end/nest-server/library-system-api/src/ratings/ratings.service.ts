import { CreateRatingDTO } from './models/CreateRatingDTO';
import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../database/entities/users.entity';
import { Book } from '../database/entities/books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../database/entities/ratings.entity';

@Injectable()
export class RatingsService {
  public constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}
  // getBookRating() -with queryBuilder

  public async createRating(userId: string, bookId: string, vote: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId, isDeleted: false },
    });

    const book = await this.booksRepository.findOne({
      where: { id: bookId, isDeleted: false },
    });

    if (!user) {
      return new BadRequestException('User not found');
    }

    if (!book) {
      return new BadRequestException('Book not found');
    }

    if (!(await this.isBookRead(user, book))) {
      return new BadRequestException(
        'The book has not been read by this user.',
      );
    }
    const rating = {
      votes: vote,
    };

    const oldRating = await this.ratingsRepository.findOne({
      where: { user, book },
    });

    const ratingEntity = this.ratingsRepository.create(rating);
    ratingEntity.user = Promise.resolve(user);
    ratingEntity.book = Promise.resolve(book);

    if (oldRating) {
      ratingEntity.id = oldRating.id;
    }

    return await this.ratingsRepository.save(ratingEntity);
  }

  private async isBookRead(user: User, book: Book) {
    const books = await user.returnedBooks;
    return books.some(item => item.id === book.id);
  }
}
