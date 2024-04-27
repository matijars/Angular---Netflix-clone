import {
  Component,
  HostBinding,
  OnChanges,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [Router, RouterLink, AuthService],
  imports: [RouterModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.matflix-header') class = true;

  authService = inject(AuthService);
  router = inject(Router);
  loggedInUser: User | null | undefined;

  ngOnInit() {
    this.loggedInUser = this.authService.getCurrentUser();
  }

  shouldRenderContent(): boolean {
    return this.router.url.includes('/login');
  }

  onSignOut() {
    this.authService.signOut();
  }
}
