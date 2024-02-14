import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);

  async registerWithEmailAndPassword(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signInWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, googleProvider);
  }
}
