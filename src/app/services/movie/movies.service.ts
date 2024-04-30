import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  tmdb = environment.tmdb;
  http = inject(HttpClient);

  getPopularMovies(): Observable<any> {
    const url =
      `https://api.themoviedb.org/3/movie/popular?api_key=` + this.tmdb.api_key;

    return this.http.get(url);
  }

  getTopRatedMovies(): Observable<any> {
    const url =
      `https://api.themoviedb.org/3/movie/top_rated?api_key=` +
      this.tmdb.api_key;

    return this.http.get(url);
  }

  getUpcomingMovies(): Observable<any> {
    const url =
      `https://api.themoviedb.org/3/movie/upcoming?api_key=` +
      this.tmdb.api_key;

    return this.http.get(url);
  }
}
