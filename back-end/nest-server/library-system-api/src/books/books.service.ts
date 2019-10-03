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

  public async createBook(book: Partial<Book>) {
    // : Promise<ShowBookDTO>
    const createdBook = await this.booksRepository.save(book);
    return createdBook;
    // return {
    //   id: createdBook.id,
    //   title: createdBook.title,
    //   author: createdBook.author,
    //   year: createdBook.year,
    //   freeToBorrow: createdBook.freeToBorrow,
    // };
  }

  public async borrowBook(
    id: string,
    update: BorrowBookDTO,
  ): Promise<ShowBookDTO> {
    const oldBook: ShowBookDTO = await this.findBookById(id);
    const updatedBook: ShowBookDTO = { ...oldBook, ...update };

    console.log('Updated borrowing of book:');
    console.log(updatedBook);

    const bookToReturn: ShowBookDTO = await this.booksRepository.save(
      updatedBook,
    );
    return bookToReturn;
  }

  public async findBookById(bookId: string): Promise<ShowBookDTO> {
    const foundBook: Book = await this.booksRepository.findOne({ id: bookId });
    console.log('Found book:');
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
    return bookToReturn;
  }

  public async delete(bookId: string): Promise<BookDTO> {
    const foundBook = await this.booksRepository.findOne({ id: bookId });
    if (!foundBook) {
      throw new BadRequestException(`There is no book with id ${bookId}!`);
    }

    foundBook.isDeleted = true;

    await this.booksRepository.save(foundBook);

    const bookToReturn: BookDTO = {
      id: foundBook.id,
      title: foundBook.title,
      author: foundBook.author,
      year: foundBook.year,
      freeToBorrow: foundBook.freeToBorrow,
      isDeleted: foundBook.isDeleted,
      reviews: await foundBook.reviews,
    };
    return bookToReturn;
  }
}
