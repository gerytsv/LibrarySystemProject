import { BooksService } from './books.service';
import { Controller } from '@nestjs/common';

@Controller('books')
export class BooksController {
  public constructor(private readonly booksDataService: BooksService) {}
}
