import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from '../../services/media/media.service';
import { MediaCardComponent } from '../../components/media-card/media-card.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader/loader.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-media-details',
  standalone: true,
  templateUrl: './media-details.component.html',
  imports: [HeaderComponent, MediaCardComponent, CommonModule, LoaderComponent],
})
export class MediaDetailsComponent implements OnInit {
  loaderService = inject(LoaderService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  mediaService = inject(MediaService);
  mediaDetails: any;
  trailerKey: string = '';
  url: string = '';

  ngOnInit(): void {
    this.url = this.router.url.split('/').slice(0, 2).join('/');
    this.getMediaDetails();
  }

  getMediaDetails() {
    const mediaId = this.route.snapshot.paramMap.get('id');

    if (mediaId)
      this.mediaService
        .getMediaDetails(mediaId, this.url)
        .subscribe((media) => {
          this.mediaDetails = media;
        });
  }
}
