import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewDTO } from './models/review.dto';

@Injectable({
  providedIn: 'root'
})
export class ReviewsDataService {
  constructor(private readonly http: HttpClient) {}

  public getReviewsOfBook(bookId: string): Observable<ReviewDTO[]> {
    return this.http.get<ReviewDTO[]>(`http://localhost:3000/api/books/${bookId}/reviews`);
  }

  public createReviewsOfBook(bookId: string, body: {content: string} ): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(`http://localhost:3000/api/books/${bookId}/reviews`, body);
  }

  public updateReviewContent(reviewId: string, body: {content: string} ): Observable<ReviewDTO> {
    return this.http.put<ReviewDTO>(`http://localhost:3000/api/books/reviews/${reviewId}`, body);
  }

  public getVotesOfReview(reviewId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/books/reviews/${reviewId}/votes`);
  }

  public deleteReview(reviewId: string): Observable<{messege: string}> {
    return this.http.delete<{messege: string}>(`http://localhost:3000/api/books/reviews/${reviewId}`)
  }

  public likeReview(reviewId: string): Observable<{messege: string}> {
    return this.http.post<{messege: string}>(`http://localhost:3000/api/books/reviews/${reviewId}/votes`, {action: 'like'});
  }

  public flagReview(reviewId: string): Observable<{messege: string}> {
    return this.http.post<{messege: string}>(`http://localhost:3000/api/books/reviews/${reviewId}/votes`, {action: 'flag'});
  }

}
