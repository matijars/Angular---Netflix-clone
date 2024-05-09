import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private movieSearchQuery: string = '';
  private movieSearchResults: any[] = [];
  private tvShowSearchQuery: string = '';
  private tvShowSearchResults: any[] = [];

  setMovieSearchQuery(query: string): void {
    this.movieSearchQuery = query;
  }

  getMovieSearchQuery(): string {
    return this.movieSearchQuery;
  }

  setMovieSearchResults(results: any[]): void {
    this.movieSearchResults = results;
  }

  getMovieSearchResults(): any[] {
    return this.movieSearchResults;
  }

  setTVShowSearchQuery(query: string): void {
    this.tvShowSearchQuery = query;
  }

  getTVShowSearchQuery(): string {
    return this.tvShowSearchQuery;
  }

  setTVShowSearchResults(results: any[]): void {
    this.tvShowSearchResults = results;
  }

  getTVShowSearchResults(): any[] {
    return this.tvShowSearchResults;
  }
}
