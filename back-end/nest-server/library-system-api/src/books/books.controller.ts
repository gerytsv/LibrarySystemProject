import { SystemError } from './../common/exceptions/system.error';
import { AdminGuard } from './../common/guards/admin.guard';
import { TransformInterceptor } from './../transformer/interceptors/transform.interceptor';
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
  ValidationPipe,
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
  public async allBooks(
    @Request() request: any,
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('borrowed') borrowed: string,
  ) {
    const books: BookDTO[] = await this.booksService.allBooks();
    if (title) {
      return books.filter(book =>
        book.title.toLowerCase().includes(title.toLowerCase()),
      );
    } else if (author) {
      return books.filter(book =>
        book.author.toLowerCase().includes(author.toLowerCase()),
      );
    } else if (borrowed) {
      return await this.booksService.getBorrowedBooksByUser(request.user.id);
    } else {
      return books;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowBookDTO))
  @HttpCode(HttpStatus.OK)
  public async bookById(@Param('id') bookId: string) {
    if (bookId) {
      return await this.booksService.findBookById(bookId);
    } else {
      throw new SystemError('Wrong book id!', 400);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(new TransformInterceptor(BookDTO))
  @HttpCode(HttpStatus.CREATED)
  public async addNewBook(
    @Request() request: any,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: CreateBookDTO,
  ) {
    return await this.booksService.createBook(request.user, body);
  }

  @Put(':id') // Should be patch maybe
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(new TransformInterceptor(ShowBookDTO))
  @HttpCode(HttpStatus.OK)
  public async updateBookBorrowing(
    @Request() request: any,
    @Param('id') bookId: string,
  ) {
    return await this.booksService.borrowBook(request.user, bookId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(new TransformInterceptor(ShowBookDTO))
  public async delete(@Request() request: any, @Param('id') id: string) {
    return await this.booksService.delete(request.user, id);
  }
}
