import { SingleBookPreviewComponent } from './single-book-preview/single-book-preview.component';
import { SharedModule } from './../../shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';
import { AllBooksPreviewComponent } from './all-books-preview/all-books-preview.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { BooksDataService } from './books-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowedBooksResolver } from '../../core/resolvers/borrowed-books.service';

@NgModule({
  declarations: [
    SingleBookComponent,
    AllBooksPreviewComponent,
    SingleBookPreviewComponent
  ],
  imports: [SharedModule, BooksRoutingModule],
  providers: [BooksDataService, BorrowedBooksResolver]
})
export class BooksModule {}
