import { BooksModule } from './components/books/books.module';
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
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { TokenInterceptorService } from './common/auth/token-interceptor.service';
import { SingleBookPreviewComponent } from './components/books/single-book-preview/single-book-preview.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SearchService } from './core/services/search.service';
import { ReviewModule } from './components/reviews/review.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

@NgModule({
  declarations: [AppComponent, MainPageBookComponent, HomepageComponent, NotFoundComponent, ServerErrorComponent],
  imports: [
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    UsersModule,
    CoreModule,
    BooksModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      countDuplicates: true
    }),
    MaterialModule,
    JwtModule.forRoot({config: {}}),
    ReviewModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    SearchService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    SingleBookPreviewComponent
  ]
})
export class AppModule {}
