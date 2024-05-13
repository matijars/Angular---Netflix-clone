import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search/search.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [Router, RouterLink, AuthService],
  imports: [RouterModule, FormsModule, CommonModule, FontAwesomeModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') class = 'mat-header';
  @Output() searchMediaEvent = new EventEmitter<string>();

  authService = inject(AuthService);
  searchService = inject(SearchService);
  router = inject(Router);
  loggedInUser: User | null | undefined;
  navBtnText!: string;
  faMagnifyingGlass = faMagnifyingGlass;

  ngOnInit() {
    this.loggedInUser = this.authService.getCurrentUser();
  }

  shouldRenderActions(): boolean {
    return this.router.url.includes('/login');
  }

  shouldRenderMediaSearch(): boolean {
    return this.router.url === '/movies' || this.router.url === '/tv-shows';
  }

  getPlaceholderText(): string {
    return this.router.url.includes('/movies') ? 'Movie name' : 'TV Show name';
  }

  getNavBtnText(): string {
    return (this.navBtnText = this.router.url.toLowerCase().includes('movies')
      ? 'TV Shows'
      : 'Movies');
  }

  getSerachedMediaVlaue(): string {
    return this.router.url.includes('/movies')
      ? this.searchService.getMovieSearchQuery()
      : this.searchService.getTVShowSearchQuery();
  }

  searchMedia(mediaName: string) {
    mediaName && this.searchMediaEvent.emit(mediaName);
  }

  navigateToMoviesOrTvShows(): void {
    const url = this.router.url.toLowerCase();
    this.navBtnText = url.includes('movies') ? 'tv-shows' : 'movies';
    this.router.navigate([`/${this.navBtnText}`]);
  }

  isMoviesOrTvShowsPage(): boolean {
    const url = this.router.url.toLowerCase();
    return url === '/movies' || url === '/tv-shows';
  }

  onSignOut() {
    this.authService.signOut();
  }
}
