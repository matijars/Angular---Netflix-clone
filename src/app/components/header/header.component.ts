import { Component, HostBinding, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [Router, RouterLink, AuthService],
  imports: [RouterModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @HostBinding('class.matflix-header') class = true;

  authService = inject(AuthService);
  user = this.authService.user;

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSignOut() {
    this.authService.signOut();
  }
}
