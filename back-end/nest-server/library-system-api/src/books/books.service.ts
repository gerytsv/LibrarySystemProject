import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../database/entities/books.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  public constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}

  public async allBooks(deleted: boolean = false): Promise<BookDTO> {}
}
