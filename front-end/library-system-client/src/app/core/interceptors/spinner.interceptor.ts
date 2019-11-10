import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  public constructor(private spinner: NgxSpinnerService) {}

  private timer;

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    // Setting timer on 500 miliseconds
    this.timer = setTimeout(() => this.spinner.show(), 500);

    return next.handle(req).pipe(
      finalize(() => {
        this.spinner.hide();
        // Hiding the spinner, if the spinner is not triggered after 500 ms the timeot is cancelled and the spinner is not going to be presented
        if (this.timer) {
          clearTimeout(this.timer);
        }
      })
    );
  }
}
