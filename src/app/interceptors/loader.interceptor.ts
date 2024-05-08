import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let loaderService = inject(LoaderService);

  loaderService.showLoader();

  return next(req).pipe(
    finalize(() => {
      loaderService.hideLoader();
      console.log('Interceptor: Request finished');
    })
  );
};
