import { AllBooksPreviewComponent } from './all-books-preview/all-books-preview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AllBooksPreviewComponent, pathMatch: 'full' }
  // { path: ':id', component: SingleBookPreviewComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
