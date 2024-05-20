import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  router = inject(Router);

  registerWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      map((userCredential: UserCredential) => {
        return undefined;
      })
    );
  }

  async signInWithGoogle() {
    try {
      const googleProvider = new GoogleAuthProvider();
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const result = signInWithPopup(this.auth, googleProvider);

      localStorage.setItem('user', JSON.stringify((await result).user));
    } catch (error) {
      console.error('Sign in with Google failed:', error);
      throw error;
    }
    this.isLoggedIn();
    if (this.isLoggedIn()) {
      this.router.navigate(['movies']);
    }
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

    return userString ? JSON.parse(userString) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  async signOut() {
    try {
      await this.auth.signOut();
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    this.router.navigate(['']);
    location.reload();
  }
}
