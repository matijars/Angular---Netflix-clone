import { Routes } from '@angular/router';
import { canActivate } from './services/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MoviesComponent } from './pages/movies/movies.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [canActivate] },
  { path: 'movies', component: MoviesComponent, canActivate: [canActivate] },
  { path: '**', redirectTo: '', component: HomeComponent },
];
