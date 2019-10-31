import { BooksDataService } from './../books-data.service';
import { BookDTO } from '../models/book.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-books-preview',
  templateUrl: './all-books-preview.component.html',
  styleUrls: ['./all-books-preview.component.css']
})
export class AllBooksPreviewComponent implements OnInit {
  public books: BookDTO[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
   this.route.data.subscribe(({books}) => this.books = books);
  }
}
