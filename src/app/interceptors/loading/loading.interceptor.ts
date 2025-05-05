import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { LoaderService } from '@shared/loader/services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  private readonly loadingService = inject(LoaderService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    console.log('totalRequests', this.totalRequests);
    return next.handle(request).pipe(
      delay(2000),
      finalize(() => {
        this.totalRequests--;
        if (!this.totalRequests) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
