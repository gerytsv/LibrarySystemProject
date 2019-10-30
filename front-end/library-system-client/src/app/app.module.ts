import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MainPageBookComponent } from './components/homepage/main-page-book/main-page-book.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AllBooksPreviewComponent } from './components/books/all-books-preview/all-books-preview.component';
import { SingleBookComponent } from './components/books/single-book/single-book.component';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { TokenInterceptorService } from './auth/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageBookComponent,
    HomepageComponent,
    AllBooksPreviewComponent,
    SingleBookComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    UsersModule,
    CoreModule, ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      countDuplicates: true,
    }),
    MaterialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent]
})
export class AppModule {}
