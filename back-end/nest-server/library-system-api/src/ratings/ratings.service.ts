import { Rating } from './../database/entities/ratings.entity';
import { CreateRatingDTO } from './models/CreateRatingDTO';
import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../database/entities/users.entity';
import { Book } from '../database/entities/books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { SystemError } from '../common/exceptions/system.error';
import { isBookRead } from '../common/util-services/is-book-read';

@Injectable()
export class RatingsService {
  public constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}

  public async getBookRating(bookId: string) {
    const book = await this.booksRepository.findOne({
      where: { id: bookId, isDeleted: false, relations: ['rating'] },
    });
    if (!book) {
      throw new BadRequestException('Book not found');
    }
    const rating: any = await book.rating;
    const rate = rating.reduce(
      (acc: { sum: number; len: number }, item: Rating) => {
        acc.sum += item.vote;
        acc.len += 1;
        return acc;
      },
      { sum: 0, len: 0 },
    );
    const avg = rate.sum / rate.len;
    return avg;
  }

  public async createRating(userId: string, bookId: string, vote: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId, isDeleted: false },
    });

    const book = await this.booksRepository.findOne({
      where: { id: bookId, isDeleted: false },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!book) {
      throw new BadRequestException('Book not found');
    }

    if (!(await isBookRead(user, book))) {
      throw new BadRequestException('The book has not been read by this user.');
    }

    const rating = {
      vote,
    };

    const ratingEntity = this.ratingsRepository.create(rating);
    ratingEntity.user = Promise.resolve(user);
    ratingEntity.book = Promise.resolve(book);

    const oldRating = await this.ratingsRepository.findOne({
      where: { user, book },
    });

    if (oldRating) {
      ratingEntity.id = oldRating.id;
    }

    return await this.ratingsRepository.save(ratingEntity);
  }

  public async getUserRatedBooks(userId: string){
    const user = await this.usersRepository.findOne({
      where: { id: userId, isDeleted: false },
      
    });
    const ratings = await this.ratingsRepository.find({where: {user},
      relations: ['book']});
    const books = ratings.map(item => item.book);
    return await Promise.all(books);
  }
}
