import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateGuard } from './guards/auth.guard';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [canActivateGuard],
  },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent,
    canActivate: [canActivateGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [canActivateGuard] },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];
