import { Component, HostBinding, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @HostBinding('class') class = 'mat-login';

  authService = inject(AuthService);

  onSignInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
