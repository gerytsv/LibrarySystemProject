import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { BooksDataService } from '../../components/books/books-data.service';

@Injectable()
export class RatedBooksResolver implements Resolve<any> {
  constructor(private readonly booksService: BooksDataService) {}

  resolve() {
    return { books: this.booksService.ratedBooks(), title: 'rated books' };
  }
}