import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-details-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './movie-details-card.component.html',
  styleUrl: './movie-details-card.component.scss',
})
export class MovieDetailsCardComponent {
  @Input() movieDetails: any;
}
