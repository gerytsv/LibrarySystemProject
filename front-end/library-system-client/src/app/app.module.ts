import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavComponent } from './components/homepage/nav/nav.component';
import { SearchComponent } from './components/homepage/search/search.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AllBooksPreviewComponent } from './components/books/all-books-preview/all-books-preview.component';
import { SingleBookComponent } from './components/books/single-book/single-book.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavComponent,
    SearchComponent,
    FooterComponent,
    AllBooksPreviewComponent,
    SingleBookComponent
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
