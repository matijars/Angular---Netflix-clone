import { Component, HostBinding, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  providers: [AuthService, RouterLink, Router],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  @HostBinding('class') class = 'mat-landing';
  registrationForm!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);

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
    this.authService.registerWithEmailAndPassword(
      this.registrationForm.value.email,
      this.registrationForm.value.password
    );

    this.authService.setUserToLocalStorage();
  }
}
