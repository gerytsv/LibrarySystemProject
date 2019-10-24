import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavComponent } from './components/homepage/nav/nav.component';
import { SearchComponent } from './components/homepage/search/search.component';
import { MainPageBookComponent } from './components/homepage/main-page-book/main-page-book.component';
import { FooterComponent } from './components/homepage/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavComponent,
    SearchComponent,
    MainPageBookComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
