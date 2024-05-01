import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie/movies.service';
import { MovieDetailsCardComponent } from '../../components/movie-details-card/movie-details-card.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  imports: [HeaderComponent, MovieDetailsCardComponent],
})
export class MovieDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  movieService = inject(MovieService);
  movieDetails: any;

  ngOnInit(): void {
    this.getMovieDetails();
  }

  getMovieDetails() {
    const movieId = this.route.snapshot.paramMap.get('id');

    if (movieId)
      this.movieService.getMovieDetails(movieId).subscribe((movie) => {
        console.log(movie);
        this.movieDetails = movie;
      });
  }
}
