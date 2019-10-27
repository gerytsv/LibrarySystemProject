import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MainPageBookComponent } from './components/homepage/main-page-book/main-page-book.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/nav/search/search.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AllBooksPreviewComponent } from './components/books/all-books-preview/all-books-preview.component';
import { SingleBookComponent } from './components/books/single-book/single-book.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageBookComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    AllBooksPreviewComponent,
    SingleBookComponent
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
