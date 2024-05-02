import { Component, HostBinding, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faHome } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { KFormatPipe } from '../../pipes/k-format.pipe';
import { OneDecimalPipe } from '../../pipes/one-decimal.pipe';

@Component({
  selector: 'app-movie-details-card',
  standalone: true,
  imports: [DatePipe, KFormatPipe, OneDecimalPipe, FontAwesomeModule],
  templateUrl: './movie-details-card.component.html',
  styleUrl: './movie-details-card.component.scss',
})
export class MovieDetailsCardComponent {
  @HostBinding('class') class = 'movie-details-card';
  @Input() movieDetails: any;

  faStar = faStar;
  faHome = faHome;
}
