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
      slides: {
        perView: 8,
        spacing: 20,
      },
      breakpoints: {
        '(max-width: 700px)': {
          slides: {
            perView: 2,
            spacing: 20,
          },
        },
        '(max-width: 400px)': {
          slides: {
            perView: 2,
            spacing: 20,
          },
        },
      },
      // loop: true,
    });
  }
}
