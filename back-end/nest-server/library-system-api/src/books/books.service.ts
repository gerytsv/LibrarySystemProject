import { SystemError } from './../common/exceptions/system.error';
import { Book } from './../database/entities/books.entity';
import { BorrowBookDTO } from './models/borrow-book.dto';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/users.entity';
import { isAdmin } from '../common/util-services/is-admin';

@Injectable()
export class BooksService {
  public constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async allBooks() {
    const books: Book[] = await this.booksRepository.find({
      where: { isDeleted: false },
    });
    return books;
  }

  public async getBorrowedBooksByUser(userId: string) {
    const books: Book[] = await this.booksRepository.find({
      where: { borrowedBy: userId },
    });
    if (books) {
    return books;
    } else {
      throw new SystemError('No books borrowed');
    }
  }

  public async createBook(creator: User, book: Partial<Book>) {
    if (isAdmin(creator)) {
      const createdBook = await this.booksRepository.save(book);
      return createdBook;
    } else {
      throw new SystemError('Only admins can create books.', 400);
    }
  }

  public async borrowBook(user: User, bookId: string) {
    const foundBook = await this.findBookById(bookId);
    if (foundBook.freeToBorrow) {
      foundBook.freeToBorrow = false;
      foundBook.borrowedBy = Promise.resolve(user);
    } else {
      foundBook.freeToBorrow = true;
      foundBook.borrowedBy = null;

      const returnedBooksOfUser = await user.returnedBooks;
      returnedBooksOfUser.push(foundBook);
      user.returnedBooks = Promise.resolve(returnedBooksOfUser);
      this.usersRepository.save(user);
    }
    return await this.booksRepository.save(foundBook);
  }

  public async findBookById(bookId: string) {
    const foundBook: Book = await this.booksRepository.findOne({ id: bookId });

    if (foundBook === undefined || foundBook.isDeleted) {
      throw new NotFoundException(`No book with id ${bookId} found.`);
    }
    return foundBook;
  }

  public async delete(creator: User, bookId: string) {
    if (isAdmin(creator)) {
      const foundBook = await this.booksRepository.findOne({ id: bookId });
      if (!foundBook) {
        throw new BadRequestException(`There is no book with id ${bookId}!`);
      }

      foundBook.isDeleted = true;

      return await this.booksRepository.save(foundBook);
    } else {
      throw new SystemError('Only admins are able to delete books.', 400);
    }
  }
}
