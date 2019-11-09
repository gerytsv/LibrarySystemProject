import { BooksDataService } from './../books-data.service';
import { BookDTO } from '../models/book.dto';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  AfterContentInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-all-books-preview',
  templateUrl: './all-books-preview.component.html',
  styleUrls: ['./all-books-preview.component.css']
})
export class AllBooksPreviewComponent implements OnInit, OnDestroy {
  public books: BookDTO[] = [];
  public title;

  private searchInfoInSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private searchInfo: SearchService,
    private readonly booksServive: BooksDataService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    if (this.route.snapshot['_routerState'].url !== '/books/search') {
      this.routeSubscription = this.route.data.subscribe(({ books }) => {
        books.books.subscribe((booksArray) => {
          if (books.title !== 'books') {
            this.title = `My ${books.title}:`;
          }
          this.books = booksArray;
          if (this.books.length === 0) {
            this.title = `No ${books.title} at the moment.`;
          }
        });
      });
    } else {
      this.searchInfoInSubscription = this.searchInfo.SearchInfo$.subscribe(
        (object) => {
          this.booksServive
            .searchBooks(object.query, object.input)
            .subscribe((books) => {
              this.books = books;
              if (this.books.length === 0) {
                this.title = `No results found for books with ${object.query} ${object.input}`;
              } else {
                this.title = `Showing results for books with ${object.query} ${object.input}`;
              }
            });
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.searchInfoInSubscription) {
      this.searchInfoInSubscription.unsubscribe();
    }
  }
}
