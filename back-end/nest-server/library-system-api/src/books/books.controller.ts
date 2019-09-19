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
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './models/book.dto';
import { CreateBookDTO } from './models/create-book.dto';

@Controller('api/books')
export class BooksController {
  public constructor(private readonly booksService: BooksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async allBooks(@Query('title') title: string): Promise<BookDTO[]> {
    const books: BookDTO[] = await this.booksService.allBooks();

    if (title) {
      return books.filter(todo =>
        todo.title.toLowerCase().includes(title.toLowerCase()),
      );
    }

    return books;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public addNewBook(@Body() body: CreateBookDTO): { msg: string } {
    this.booksService.createBook(body);
    return { msg: 'Book Added!' };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async borrowBook(
    @Param('id') bookId: string,
    @Body() body: BorrowBookDTO,
  ): Promise<ResponseMessageDTO> {
    await this.booksService.borrowBook(bookId, body);
    return { msg: 'Book borrowed!' };
  }
}
