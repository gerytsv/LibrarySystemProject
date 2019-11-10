import { AllBooksPreviewComponent } from './all-books-preview/all-books-preview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorrowedBooksResolver } from '../../core/resolvers/borrowed-books.service';
import { AllBooksResolver } from '../../core/resolvers/all-books.service';
import { RatedBooksResolver } from '../../core/resolvers/rated-books.service';
import { ReviewedBooksResolver } from '../../core/resolvers/reviewed-books.service';




const routes: Routes = [
  { path: '', component: AllBooksPreviewComponent, resolve: {books: AllBooksResolver}, pathMatch: 'full'},
  { path: 'borrowed', component: AllBooksPreviewComponent, resolve: {books: BorrowedBooksResolver}},
  { path: 'search', component: AllBooksPreviewComponent},
  { path: 'rated', component: AllBooksPreviewComponent, resolve: {books: RatedBooksResolver}},
  { path: 'reviewed', component: AllBooksPreviewComponent, resolve: {books: ReviewedBooksResolver}}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
