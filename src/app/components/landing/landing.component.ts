import { Component, HostBinding, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  providers: [AuthService, RouterLink, Router],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  @HostBinding('class') class = 'mat-landing';
  registrationForm!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  errorMessage: string | null = null;
  router = inject(Router);

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  initRegistrationForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.errorMessage = null;

    this.authService
      .registerWithEmailAndPassword(
        this.registrationForm.value.email,
        this.registrationForm.value.password
      )
      .subscribe({
        next: () => {
          this.authService.setUserToLocalStorage();
          this.router.navigate(['movies']);
        },
        error: (error) => {
          if (error.message.includes('invalid-email')) {
            this.errorMessage = 'Invalid email';
          } else if (error.message.includes('weak-password')) {
            this.errorMessage = 'Password should be at least 6 characters';
          } else if (error.message.includes('email-already-in-use')) {
            this.errorMessage = 'Email is already in use';
          } else {
            this.errorMessage = error.message;
          }
          console.log(error.message);
        },
      });
  }
}
