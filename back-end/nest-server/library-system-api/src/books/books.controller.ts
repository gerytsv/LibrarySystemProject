import { BooksService } from './books.service';
import { Controller, Get } from '@nestjs/common';

@Controller('books')
export class BooksController {
  public constructor(private readonly booksDataService: BooksService) {}

  @Get()
  public async getBooks() {
    const books = await this.booksDataService.allBooks();
    return books;
  }
  // @Post()
}
