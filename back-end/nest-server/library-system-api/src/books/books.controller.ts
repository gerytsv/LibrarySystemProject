import { Controller, Get, HttpCode, HttpStatus, Query, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './models/book.dto';
import { CreateBookDTO } from './models/create-book.dto';

@Controller('books')
export class BooksController {
    public constructor(private readonly booksService: BooksService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async allTodos(@Query('title') title: string): Promise<BookDTO[]> {
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
    public addNewBook(@Body() body: CreateBookDTO): {msg: string} {
        console.log(body);
    this.booksService.createBook(body);
    return { msg: 'Book Added!' };
  }
}
