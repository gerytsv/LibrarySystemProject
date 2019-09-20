import { Book } from './../database/entities/books.entity';
import { BorrowBookDTO } from './models/borrow-book.dto';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from './models/book.dto';
import { CreateBookDTO } from './models/create-book.dto';

@Injectable()
export class BooksService {
  public constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<BookDTO>,
  ) {}

  public async allBooks(): Promise<BookDTO[]> {
    return await this.booksRepository.find({ where: { isDeleted: false } });
  }

  public async createBook(book: CreateBookDTO): Promise<BookDTO> {
    return await this.booksRepository.save(book);
  }

  public async borrowBook(id: string, update: BorrowBookDTO): Promise<BookDTO> {
    const oldBook: Book = await this.findBookById(id);
    const updatedBook: Book = { ...oldBook, ...update };

    console.log('Borrowed book:');
    console.log(updatedBook);

    return this.booksRepository.save(updatedBook);
  }

  public async findBookById(bookId: string): Promise<BookDTO> {
    const foundBook: Book = await this.booksRepository.findOne({ id: bookId });
    if (foundBook === undefined || foundBook.isDeleted) {
      throw new NotFoundException(`No book with id ${bookId} found.`);
    }
    return foundBook;
  }

  /*

  async delete(id: string): Promise<void> {
    const foundBook = await this.bookRepository.findOne({ id });
    if (!foundBook) {
      throw new BadRequestException(`There is no book with id ${id}!`);
    }

    foundBook.isDeleted = true;
    await this.bookRepository.save(bookHero);
  }

  */
}
