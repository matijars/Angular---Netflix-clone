import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { TodosFirebaseService } from './services/todosFirebase.service';
import { TodoInterface } from './interfaces/todo.interface';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { SectionComponent } from './components/section/section.component';
import { SectionData } from './helpers/section.data';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    LandingComponent,
    SectionComponent,
  ],
})
export class AppComponent implements OnInit {
  registrationForm!: FormGroup;
  todosFirebaseService = inject(TodosFirebaseService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  todos!: TodoInterface[];
  sectionData = SectionData;

  ngOnInit() {
    this.initRegistrationForm();

    // this.todosFirebaseService.getTodos().subscribe((todos) => {
    //   this.todos = todos;
    // });
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
  }

  onSignInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
