import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [HeaderComponent, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  errorMessage: string | null = null;

  @HostBinding('class') class = 'mat-login';

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', []],
      password: ['', []],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .signInWithEmailAndPassword(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .then(() => {
          this.router.navigate(['']);
        })
        .catch((error) => {
          if (error.message.includes('invalid-email')) {
            this.errorMessage = 'Invalid email';
          } else if (error.message.includes('invalid-credential')) {
            this.errorMessage = 'Invalid credential';
          } else if (error.message.includes('missing-password')) {
            this.errorMessage = 'Password is required';
          } else {
            this.errorMessage = error.message;
          }
        });
    }
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
