import { BorrowBookDTO } from './models/borrow-book.dto';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from './models/book.dto';
import { Book } from '../database/entities/books.entity';
import { CreateBookDTO } from './models/create-book.dto';

@Injectable()
export class BooksService {
  public constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<BookDTO>,
  ) {}

  public async allBooks(withDeleted: boolean = false): Promise<BookDTO[]> {
    return withDeleted
      ? await this.booksRepository.find()
      : await this.booksRepository.find({ where: { isDeleted: false } });
  }

  public async createBook(book: CreateBookDTO): Promise<BookDTO> {
    return await this.booksRepository.save(book);
  }

  public async borrowBook(
    id: string,
    updatedBook: BorrowBookDTO,
  ): Promise<BookDTO> {
    const oldBook: Book = await this.findBookById(id);
    const bookToUpdate: Book = { ...oldBook, ...updatedBook };

    console.log('Borrowed book:');
    console.log(bookToUpdate);

    return this.booksRepository.save(bookToUpdate);
  }

  public async findBookById(bookId: string): Promise<BookDTO> {
    const foundBook: Book = await this.booksRepository.findOne({ id: bookId });
    if (foundBook === undefined || foundBook.isDeleted) {
      throw new NotFoundException('No such book found.');
    }
    return foundBook;
  }
}
