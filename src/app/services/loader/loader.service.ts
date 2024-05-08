import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loading: boolean = false;

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
}
