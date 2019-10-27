import { BooksDataService } from './../books-data.service';
import { BookDTO } from '../models/book.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-books-preview',
  templateUrl: './all-books-preview.component.html',
  styleUrls: ['./all-books-preview.component.css']
})
export class AllBooksPreviewComponent implements OnInit {
  public books: BookDTO[] = [];
  constructor(private readonly booksDataService: BooksDataService) {}

  ngOnInit() {
    this.booksDataService.getAllBooks().subscribe((data: BookDTO[]) => {
      this.books = data;
      console.log(this.books);
    });
  }
}
