import { Component, HostBinding, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar,
  faHome,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-details-card',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule],
  templateUrl: './movie-details-card.component.html',
  styleUrl: './movie-details-card.component.scss',
})
export class MovieDetailsCardComponent {
  @HostBinding('class') class = 'movie-details-card';
  @Input() movieDetails: any;

  faStar = faStar;
  faHome = faHome;

  renderStars(rating: number): IconDefinition[] {
    return Array(Math.min(Math.floor(rating), 10)).fill(faStar);
  }
}
