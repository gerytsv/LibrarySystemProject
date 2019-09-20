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
import { ShowBookDTO } from './models/show-book.dto';

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
    const returnObject: ShowBookDTO[] = books.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      year: book.year,
      freeToBorrow: book.freeToBorrow,
    }));
    return returnObject;
  }

  public async createBook(book: CreateBookDTO): Promise<ShowBookDTO> {
    // const createdBook = this.booksRepository.create(book);
    return await this.booksRepository.save(book);
  }

  public async borrowBook(
    id: string,
    update: BorrowBookDTO,
  ): Promise<ShowBookDTO> {
    const oldBook: ShowBookDTO = await this.findBookById(id);
    const updatedBook: ShowBookDTO = { ...oldBook, ...update };

    console.log('Borrowed book:');
    console.log(updatedBook);

    return this.booksRepository.save(updatedBook);
  }

  public async findBookById(bookId: string): Promise<ShowBookDTO> {
    const foundBook: Book = await this.booksRepository.findOne({ id: bookId });
    console.log(foundBook);
    if (foundBook === undefined || foundBook.isDeleted) {
      throw new NotFoundException(`No book with id ${bookId} found.`);
    }
    const bookToReturn: ShowBookDTO = {
      id: foundBook.id,
      title: foundBook.title,
      author: foundBook.author,
      year: foundBook.year,
      freeToBorrow: foundBook.freeToBorrow,
    };
    console.log(bookToReturn);
    return bookToReturn;
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
