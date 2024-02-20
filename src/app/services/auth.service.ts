import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  router = inject(Router);
  user!: User;
  loggedInUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  async registerWithEmailAndPassword(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password);
    this.router.navigate(['/movies']);
  }

  async signInWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    await signInWithPopup(this.auth, googleProvider);
  }

  setUserToLocalStorage() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    });
  }

  getCurrentUser(): User {
    const userString = localStorage.getItem('user');
    this.loggedInUser = JSON.parse(userString!);

    console.log(this.loggedInUser);

    return userString ? JSON.parse(userString) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  async signOut() {
    try {
      await this.auth.signOut();
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    this.router.navigate(['']);
  }
}
