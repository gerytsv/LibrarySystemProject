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
import { ShowBookDTO } from './models/show-book.dto';

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
  public addNewBook(@Body() body: CreateBookDTO): { msg: string } {
    this.booksService.createBook(body);
    return { msg: 'Book Added!' };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async borrowBook(
    @Param('id') bookId: string,
    @Body() body: BorrowBookDTO,
  ): Promise<ResponseMessageDTO> {
    await this.booksService.borrowBook(bookId, body);
    return { msg: 'Book borrowed!' };
  }

  /*
    @Delete(':id')
  async delete(@Param('id') id: string): Promise<{message: string}> {

    await this.bookService.delete(id);

    return {
      message: `Book deleted!`,
    };
  }
  */
}
