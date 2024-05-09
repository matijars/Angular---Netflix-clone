import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MediaListComponent } from './pages/media-list/media-list.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateGuard } from './guards/auth.guard';
import { MediaDetailsComponent } from './pages/media-details/media-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movies',
    component: MediaListComponent,
    canActivate: [canActivateGuard],
  },
  {
    path: 'movies/:id',
    component: MediaDetailsComponent,
    canActivate: [canActivateGuard],
  },
  {
    path: 'tv-shows',
    component: MediaListComponent,
    canActivate: [canActivateGuard],
  },
  {
    path: 'tv-shows/:id',
    component: MediaDetailsComponent,
    canActivate: [canActivateGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [canActivateGuard] },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];
