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
  Patch,
  Request,
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
  @UseInterceptors(new TransformInterceptor(ShowBookDTO))
  @HttpCode(HttpStatus.OK)
  public async allBooks() {
    // TODO: add searching by title/author
    return await this.booksService.allBooks();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowBookDTO))
  @HttpCode(HttpStatus.OK)
  public async bookById(@Param('id') bookId: string) {
    if (bookId) {
      return await this.booksService.findBookById(bookId);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(BookDTO))
  @HttpCode(HttpStatus.CREATED)
  public async addNewBook(@Body() body: CreateBookDTO) {
    return await this.booksService.createBook(body);
  }

  @Put(':id') // Should be patch
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowBookDTO))
  @HttpCode(HttpStatus.OK)
  public async updateBookBorrowing(
    @Request() request: any,
    @Param('id') bookId: string,
  ) {
    return await this.booksService.borrowBook(request.user, bookId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowBookDTO))
  public async delete(@Param('id') id: string) {
    return await this.booksService.delete(id);
  }
}
