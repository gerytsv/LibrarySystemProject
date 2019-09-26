import { BorrowBookDTO } from './models/borrow-book.dto';
import { ResponseMessageDTO } from './models/response-message.dto';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './models/book.dto';
import { CreateBookDTO } from './models/create-book.dto';
import { ShowBookDTO } from './models/show-book.dto';
import { Book } from '../database/entities/books.entity';

@Controller('api/books')
export class BooksController {
  public constructor(private readonly booksService: BooksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async allBooks(): Promise<ShowBookDTO[]> {
    return await this.booksService.allBooks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async bookById(@Param('id') bookId: string): Promise<ShowBookDTO> {
    if (bookId) {
      return await this.booksService.findBookById(bookId);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async addNewBook(
    @Body() body: CreateBookDTO,
  ): Promise<ResponseMessageDTO> {
    await this.booksService.createBook(body);
    return { msg: 'Book Added!' };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async updateBookBorrowing(
    @Param('id') bookId: string,
    @Body() body: BorrowBookDTO,
  ): Promise<ShowBookDTO> {
    return await this.booksService.borrowBook(bookId, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<BookDTO> {
    return await this.booksService.delete(id);
  }
}
