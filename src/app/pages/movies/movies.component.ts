import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieService } from '../../services/movie/movies.service';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  providers: [Router],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  @HostBinding('class') class = 'mat-movies';
  @ViewChild('popularSliderRef') popularSliderRef!: ElementRef<HTMLElement>;
  @ViewChild('topRatedSliderRef') topRatedSliderRef!: ElementRef<HTMLElement>;
  @ViewChild('upcomingSliderRef') upcomingSliderRef!: ElementRef<HTMLElement>;
  @ViewChild('searchedSliderRef') searchedSliderRef!: ElementRef<HTMLElement>;

  cdr = inject(ChangeDetectorRef);
  movieService = inject(MovieService);
  router = inject(Router);
  popularMovieList: any[] = [];
  topRatedMovieList: any[] = [];
  upcomingMovieList: any[] = [];
  searchedMovieList: any[] = [];
  slider: KeenSliderInstance | null = null;
  shouldRenderSearch: boolean = false;

  ngOnInit() {
    this.getPopularMovieList();
    this.getTopRatedMovieList();
    this.getUpcomingMovieList();
  }

  getPopularMovieList() {
    this.movieService.getPopularMovies().subscribe((movie) => {
      this.popularMovieList = movie.results;
      this.cdr.detectChanges();
      this.popularSliderInit();
    });
  }

  getTopRatedMovieList() {
    this.movieService.getTopRatedMovies().subscribe((movie) => {
      this.topRatedMovieList = movie.results;
      this.cdr.detectChanges();
      this.topRatedSliderInit();
    });
  }

  getUpcomingMovieList() {
    this.movieService.getUpcomingMovies().subscribe((movie) => {
      this.upcomingMovieList = movie.results;
      this.cdr.detectChanges();
      this.upcomingSliderInit();
    });
  }

  getSearchedMovieList(movieName: string): void {
    this.shouldRenderSearch = true;
    this.movieService.searchMovie(movieName).subscribe((movie) => {
      const filteredMovies = movie.results.filter(
        (movie: any) => movie.backdrop_path && movie.poster_path
      );
      this.searchedMovieList = filteredMovies;
      this.cdr.detectChanges();
      this.searchedSliderInit();
    });
  }

  initializeSlider(sliderRef: ElementRef): void {
    this.slider = new KeenSlider(sliderRef.nativeElement, {
      slides: () => {
        const numSlides = 20;
        const slidesData = Array.from({ length: numSlides }, () => ({
          size: 0.15,
          spacing: 0.02,
        }));
        return slidesData;
      },
      breakpoints: {
        '(max-width: 1300px)': {
          slides: {
            perView: 5.5,
            spacing: 20,
          },
        },
        '(max-width: 1100px)': {
          slides: {
            perView: 4.5,
            spacing: 20,
          },
        },
        '(max-width: 900px)': {
          slides: {
            perView: 3.5,
            spacing: 20,
          },
        },
        '(max-width: 650px)': {
          slides: {
            perView: 2.8,
            spacing: 20,
          },
        },
        '(max-width: 500px)': {
          slides: {
            perView: 2.2,
            spacing: 20,
          },
        },
        '(max-width: 400px)': {
          slides: {
            perView: 1.8,
            spacing: 20,
          },
        },
      },
      mode: 'snap',
    });
  }

  searchedSliderInit() {
    this.initializeSlider(this.searchedSliderRef);
  }

  popularSliderInit() {
    this.initializeSlider(this.popularSliderRef);
  }

  topRatedSliderInit() {
    this.initializeSlider(this.topRatedSliderRef);
  }

  upcomingSliderInit() {
    this.initializeSlider(this.upcomingSliderRef);
  }

  goToMovieDetails(movieId: string) {
    this.router.navigate(['movies', movieId]);
  }
}
