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

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  @HostBinding('class') class = 'mat-movies';
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  cdr = inject(ChangeDetectorRef);
  movieService = inject(MovieService);
  movieList: any[] = [];
  slider: KeenSliderInstance | null = null;

  ngOnInit() {
    this.getPopularMovieList();
  }

  getPopularMovieList() {
    this.movieService.getPopularMovies().subscribe((movie) => {
      console.log(movie.results);
      this.movieList = movie.results;
      this.cdr.detectChanges();
      this.sliderInit();
    });
  }

  sliderInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
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
      // loop: true,
      mode: 'snap',
    });
  }
}
