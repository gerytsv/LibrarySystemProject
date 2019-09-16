import { BookDTO } from './models/book.dto';
import { BooksService } from './books.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('books')
export class BooksController {
  public constructor(private readonly booksDataService: BooksService) {}

  @Get()
  public async getBooks(@Query('title') title: string): Promise<BookDTO[]> {
    const books: BookDTO[] = await this.booksDataService.allBooks();

    if (title) {
      return books.filter(book =>
        book.title.toLowerCase().includes(title.toLowerCase()),
      );
    }
    return books;
  }
  // @Post()
}
