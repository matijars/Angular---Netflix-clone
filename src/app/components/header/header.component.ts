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
import { MovieService } from '../../services/movie/movies.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [Router, RouterLink, AuthService, MovieService],
  imports: [RouterModule, FormsModule, CommonModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.matflix-header') class = true;
  @Output() searchMovieEvent = new EventEmitter<string>();

  authService = inject(AuthService);
  movieService = inject(MovieService);
  searchService = inject(SearchService);
  router = inject(Router);
  loggedInUser: User | null | undefined;

  ngOnInit() {
    this.loggedInUser = this.authService.getCurrentUser();
  }

  shouldRenderActions(): boolean {
    return this.router.url.includes('/login');
  }

  shouldRenderMovieSearch(): boolean {
    return this.router.url === '/movies';
  }

  searchMovie(movieName: string) {
    movieName && this.searchMovieEvent.emit(movieName);
  }

  onSignOut() {
    this.authService.signOut();
  }
}
