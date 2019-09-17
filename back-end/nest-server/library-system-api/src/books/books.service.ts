import { CreateBookDTO } from './models/create-book.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from '../models/book.dto';
import { Book } from '../database/entities/books.entity';
import { CreateBookDTO } from '../models/create-book.dto';

@Injectable()
export class BooksService {
    public constructor(
        @InjectRepository(Book) private readonly booksRepository: Repository<BookDTO>
    ) {}

    public  async allBooks(withDeleted: boolean = false): Promise<BookDTO[]> {
        return withDeleted
          ? await this.booksRepository.find()
          : await this.booksRepository.find({where: { isDeleted : false}}
          );
        }

    public async createBook(book: CreateBookDTO): Promise<BookDTO> {
      return  await this.booksRepository.save(book);
    }
}
