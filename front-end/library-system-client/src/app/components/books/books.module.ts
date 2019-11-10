import { SingleBookPreviewComponent } from './single-book-preview/single-book-preview.component';
import { SharedModule } from './../../shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';
import { AllBooksPreviewComponent } from './all-books-preview/all-books-preview.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { BooksDataService } from './books-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowedBooksResolver } from '../../core/resolvers/borrowed-books.service';
import { CoreModule } from '../../core/core.module';
import { SearchService } from '../../core/services/search.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewModule } from '../reviews/review.module';
import { BookRatingComponent } from './book-rating/book-rating.component';

@NgModule({
  declarations: [
    SingleBookComponent,
    AllBooksPreviewComponent,
    SingleBookPreviewComponent,
    BookRatingComponent
  ],
  imports: [SharedModule, BooksRoutingModule, CoreModule, ReactiveFormsModule, ReviewModule],
  providers: [BooksDataService],
})
export class BooksModule {}
