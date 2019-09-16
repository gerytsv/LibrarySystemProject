import { CreateBookDTO } from './models/create-book.dto';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../database/entities/books.entity';
import { Repository } from 'typeorm';
import { BookDTO } from './models/book.dto';
import moment from 'moment';

@Injectable()
export class BooksService {
  public constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}

  public async allBooks(withDeleted: boolean = false): Promise<BookDTO[]> {
    return (await withDeleted)
      ? this.booksRepository.find({ isDeleted: true })
      : this.booksRepository.find({ isDeletes: false });
  }

  public async createBook(book: CreateBookDTO): Promise<BookDTO> {
    this.validateBookParameters(book.title, book.author, book.year);

    const bookModel: BookDTO = {
      ...book,
      freeToBorrow: false,
      isDeleted: false,
    } as BookDTO;

    return await this.booksRepository.save(bookModel);
  }
  // update

  // delete

  // find

  private validateBookParameters(
    title: string,
    author: string,
    year: string,
  ): void {
    if (title === undefined) {
      throw new BadRequestException(
        'The book should have a valid title property',
      );
    }
    if (author === undefined) {
      throw new BadRequestException(
        'The book should have a valid author property',
      );
    }
    if (!moment(year, ['YYYY']).isValid()) {
      throw new BadRequestException(
        'The book should have a valid year property in format YYYY',
      );
    }
  }
}
