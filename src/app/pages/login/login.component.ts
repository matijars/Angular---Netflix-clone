import { Component, HostBinding, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [HeaderComponent],
})
export class LoginComponent {
  @HostBinding('class') class = 'mat-login';

  authService = inject(AuthService);

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
