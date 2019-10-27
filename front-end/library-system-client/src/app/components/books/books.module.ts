import { AllBooksPreviewComponent } from './all-books-preview/all-books-preview.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { BooksDataService } from './books-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SingleBookComponent, AllBooksPreviewComponent],
  imports: [CommonModule],
  providers: [BooksDataService]
})
export class BooksModule {}
