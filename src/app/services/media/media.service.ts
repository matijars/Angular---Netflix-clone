import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  tmdb = environment.tmdb;
  http = inject(HttpClient);

  getPopularMedia(mediaType: string): Observable<any> {
    const url = (() => {
      switch (mediaType) {
        case '/movies':
          return `${this.tmdb.movie_base_url}popular?api_key=${this.tmdb.api_key}`;
        case '/tv-shows':
          return `${this.tmdb.tv_shows_base_url}popular?api_key=${this.tmdb.api_key}`;
        default:
          throw new Error('Invalid data type provided.');
      }
    })();

    return this.http.get(url);
  }

  getTopRatedMedia(mediaType: string): Observable<any> {
    const url = (() => {
      switch (mediaType) {
        case '/movies':
          return `${this.tmdb.movie_base_url}top_rated?api_key=${this.tmdb.api_key}`;
        case '/tv-shows':
          return `${this.tmdb.tv_shows_base_url}top_rated?api_key=${this.tmdb.api_key}`;
        default:
          throw new Error('Invalid data type provided.');
      }
    })();

    return this.http.get(url);
  }

  getUpcomingMedia(): Observable<any> {
    const url = `${this.tmdb.movie_base_url}upcoming?api_key=${this.tmdb.api_key}`;

    return this.http.get(url);
  }

  getMediaDetails(mediaId: string, mediaType: string): Observable<any> {
    const url = (() => {
      switch (mediaType) {
        case '/movies':
          return `${this.tmdb.movie_base_url}${mediaId}?api_key=${this.tmdb.api_key}`;
        case '/tv-shows':
          return `${this.tmdb.tv_shows_base_url}${mediaId}?api_key=${this.tmdb.api_key}`;
        default:
          throw new Error('Invalid data type provided.');
      }
    })();

    return this.http.get(url);
  }

  getMediaVideos(mediaId: string, mediaType: string): Observable<any> {
    const url = (() => {
      switch (mediaType) {
        case '/movies':
          return `${this.tmdb.movie_base_url}${mediaId}/videos?api_key=${this.tmdb.api_key}`;
        case '/tv-shows':
          return `${this.tmdb.tv_shows_base_url}${mediaId}/videos?api_key=${this.tmdb.api_key}`;
        default:
          throw new Error('Invalid data type provided.');
      }
    })();

    return this.http.get(url);
  }

  searchMedia(mediaName: string, mediaType: string): Observable<any> {
    const url = (() => {
      switch (mediaType) {
        case '/movies':
          return `${this.tmdb.search_movie_url}${mediaName}&api_key=${this.tmdb.api_key}`;
        case '/tv-shows':
          return `${this.tmdb.search_tv_show_url}${mediaName}&api_key=${this.tmdb.api_key}`;
        default:
          throw new Error('Invalid data type provided.');
      }
    })();

    return this.http.get(url);
  }
}
