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
import { MediaService } from '../../services/media/media.service';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { LoaderService } from '../../services/loader/loader.service';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-media-list',
  standalone: true,
  providers: [Router],
  templateUrl: './media-list.component.html',
  imports: [HeaderComponent, CommonModule, LoaderComponent],
})
export class MediaListComponent implements OnInit {
  @HostBinding('class') class = 'mat-movies';
  @ViewChild('popularSliderRef') popularSliderRef!: ElementRef<HTMLElement>;
  @ViewChild('topRatedSliderRef') topRatedSliderRef!: ElementRef<HTMLElement>;
  @ViewChild('upcomingSliderRef') upcomingSliderRef!: ElementRef<HTMLElement>;
  @ViewChild('searchedSliderRef') searchedSliderRef!: ElementRef<HTMLElement>;

  cdr = inject(ChangeDetectorRef);
  mediaService = inject(MediaService);
  router = inject(Router);
  loaderService = inject(LoaderService);
  searchService = inject(SearchService);
  popularMediaList: any[] = [];
  topRatedMediaList: any[] = [];
  upcomingMediaList: any[] = [];
  searchedMediaList: any[] = [];
  slider: KeenSliderInstance | null = null;
  shouldRenderSearch: boolean = false;
  storedMediaName: string = '';
  url: string = '';

  ngOnInit() {
    this.url = this.router.url;
    this.getPopularMediaList();
    this.getTopRatedMediaList();
    if (this.url === '/movies') {
      this.getUpcomingMediaList();
    }
    this.getStoredMediaList();
  }

  getPopularMediaList() {
    this.mediaService.getPopularMedia(this.url).subscribe((media) => {
      this.popularMediaList = media.results;
      this.cdr.detectChanges();
      this.popularSliderInit();
    });
  }

  getTopRatedMediaList() {
    this.mediaService.getTopRatedMedia(this.url).subscribe((media) => {
      this.topRatedMediaList = media.results;
      this.cdr.detectChanges();
      this.topRatedSliderInit();
    });
  }

  getUpcomingMediaList() {
    this.mediaService.getUpcomingMedia().subscribe((media) => {
      this.upcomingMediaList = media.results;
      this.cdr.detectChanges();
      this.upcomingSliderInit();
    });
  }

  getSearchedMediaList(mediaName: string): void {
    this.shouldRenderSearch = true;
    this.mediaService.searchMedia(mediaName, this.url).subscribe((media) => {
      const filteredMedia = media.results.filter(
        (media: any) => media.backdrop_path && media.poster_path
      );
      this.searchedMediaList = filteredMedia;
      this.cdr.detectChanges();
      this.searchedSliderInit();

      if (this.url === '/movies') {
        this.searchService.setMovieSearchQuery(mediaName);
        this.searchService.setMovieSearchResults(filteredMedia);
      } else {
        this.searchService.setTVShowSearchQuery(mediaName);
        this.searchService.setTVShowSearchResults(filteredMedia);
      }
    });
  }

  getStoredMediaList(): void {
    if (this.url === '/movies') {
      this.storedMediaName = this.searchService.getMovieSearchQuery();
      this.storedMediaName && this.getSearchedMediaList(this.storedMediaName);
    } else {
      this.storedMediaName = this.searchService.getTVShowSearchQuery();
      this.storedMediaName && this.getSearchedMediaList(this.storedMediaName);
    }
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

  goToMediaDetails(mediaId: string) {
    if (this.url === '/movies') {
      this.router.navigate(['movies', mediaId]);
    } else {
      this.router.navigate(['tv-shows', mediaId]);
    }
  }
}
