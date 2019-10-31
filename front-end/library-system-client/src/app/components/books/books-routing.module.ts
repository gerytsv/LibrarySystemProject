import { AllBooksPreviewComponent } from './all-books-preview/all-books-preview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BorrowedBooksResolver } from '../../core/resolvers/borrowed-books.service';


const routes: Routes = [
  { path: '', component: AllBooksPreviewComponent, pathMatch: 'full' },
  { path: 'borrowed', component: AllBooksPreviewComponent, resolve: {books: BorrowedBooksResolver}}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
