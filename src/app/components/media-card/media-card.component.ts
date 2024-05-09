import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faHome } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { KFormatPipe } from '../../pipes/k-format.pipe';
import { OneDecimalPipe } from '../../pipes/one-decimal.pipe';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [DatePipe, KFormatPipe, OneDecimalPipe, FontAwesomeModule],
  templateUrl: './media-card.component.html',
})
export class MediaCardComponent implements OnInit {
  @HostBinding('class') class = 'media-card';
  @Input() mediaDetails: any;

  isMovie: boolean = true;

  faStar = faStar;
  faHome = faHome;

  ngOnInit(): void {
    this.isMovie = !('seasons' in this.mediaDetails);
    console.log(this.mediaDetails);
  }
}
