import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery: string = '';
  private searchResults: any[] = [];

  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }

  getSearchQuery(): string {
    return this.searchQuery;
  }

  setSearchResults(results: any[]): void {
    this.searchResults = results;
  }

  getSearchResults(): any[] {
    return this.searchResults;
  }
}
