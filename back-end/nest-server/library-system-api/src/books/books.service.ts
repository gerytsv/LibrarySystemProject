import { Book } from './../database/entities/books.entity';
import { BorrowBookDTO } from './models/borrow-book.dto';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDTO } from './models/create-book.dto';
import { ShowBookDTO } from './models/show-book.dto';
import { BookDTO } from './models/book.dto';

@Injectable()
export class BooksService {
  public constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  public async allBooks(): Promise<ShowBookDTO[]> {
    const books: Book[] = await this.booksRepository.find({
      where: { isDeleted: false },
    });
    const booksToReturn: ShowBookDTO[] = books.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      year: book.year,
      freeToBorrow: book.freeToBorrow,
    }));
    return booksToReturn;
  }

  public async createBook(book: Partial<Book>): Promise<Book> {
    // const createdBook = this.booksRepository.create(book);
    return await this.booksRepository.save(book);
  }

  public async borrowBook(id: string, update: BorrowBookDTO): Promise<BookDTO> {
    const oldBook: Book = await this.findBookById(id);
    const updatedBook: Book = { ...oldBook, ...update };

    console.log('Updated borrowing of book:');
    console.log(updatedBook);

    const bookToReturn: Book = await this.booksRepository.save(updatedBook);
    // return {
    //   id: bookToReturn.id,
    //   title: bookToReturn.title,
    //   author: bookToReturn.author,
    //   year: bookToReturn.year,
    //   freeToBorrow: bookToReturn.freeToBorrow,
    // };
    return bookToReturn;
  }

  public async findBookById(bookId: string): Promise<Book> {
    const foundBook: Book = await this.booksRepository.findOne({ id: bookId });
    console.log(foundBook);
    if (foundBook === undefined || foundBook.isDeleted) {
      throw new NotFoundException(`No book with id ${bookId} found.`);
    }
    return foundBook;
    // const bookToReturn: ShowBookDTO = {
    //   id: foundBook.id,
    //   title: foundBook.title,
    //   author: foundBook.author,
    //   year: foundBook.year,
    //   freeToBorrow: foundBook.freeToBorrow,
    // };
    // return bookToReturn;
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
