import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDTO } from './models/book.dto';

@Injectable({
  providedIn: 'root'
})
export class BooksDataService {
  constructor(private readonly http: HttpClient) {}

  public getBorrowedBooks(): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(`http://localhost:3000/api/books?borrowed=true`);
  }

  public allBooks(): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(`http://localhost:3000/api/books`);
  }
}
