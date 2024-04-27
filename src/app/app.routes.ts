import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [canActivateGuard],
  },
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];
