import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BooksDataService } from '../../components/books/books-data.service';
import { Router } from '@angular/router';

@Injectable()
export class SearchService {
  private readonly SearchInfoSubject$ = new BehaviorSubject<any>(null);

  constructor(
    private readonly booksService: BooksDataService,
    private readonly router: Router
  ) {}

  public get SearchInfo$(): Observable<any> {
    return this.SearchInfoSubject$.asObservable();
  }

  public collectSearchInfo(query: string, input: string) {
    this.SearchInfoSubject$.next({ query, input }),
      this.router.navigate(['/books/search']);
  }

  public getInfo() {
    console.log(this.SearchInfoSubject$.value);
  }
}
