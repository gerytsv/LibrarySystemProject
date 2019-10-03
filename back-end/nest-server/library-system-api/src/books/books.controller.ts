import { TransformInterceptor } from './../transformer/interceptors/transform.interceptor';
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
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './models/book.dto';
import { CreateBookDTO } from './models/create-book.dto';
import { ShowBookDTO } from './models/show-book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/books')
export class BooksController {
  public constructor(private readonly booksService: BooksService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async allBooks(): Promise<ShowBookDTO[]> {
    return await this.booksService.allBooks();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async bookById(@Param('id') bookId: string): Promise<ShowBookDTO> {
    if (bookId) {
      return await this.booksService.findBookById(bookId);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(BookDTO))
  @HttpCode(HttpStatus.CREATED)
  public async addNewBook(@Body() body: CreateBookDTO) {
    // : Promise<ResponseMessageDTO>
    return await this.booksService.createBook(body);
    // Return { msg: 'Book Added!' };
  }

  @Put(':id') // Should be patch
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async updateBookBorrowing(
    @Param('id') bookId: string,
    @Body() body: BorrowBookDTO,
  ): Promise<ShowBookDTO> {
    return await this.booksService.borrowBook(bookId, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public async delete(@Param('id') id: string): Promise<BookDTO> {
    return await this.booksService.delete(id);
  }
}
