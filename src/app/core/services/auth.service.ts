import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  GithubAuthProvider,
  signInWithPopup,
  type User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);

  public currentLoggedInUser = signal<null | User>(null);

  public async signInWithGithub() {
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(this.firebaseAuth, provider);
      const user = result.user;
      this.currentLoggedInUser.set(user);
      console.log('User signed in:', user);

      return result;
    } catch (error) {
      console.error('Error during GitHub sign-in:', error);
      throw error;
    }
  }

  public async signOut() {
    try {
      await this.firebaseAuth.signOut();
      this.currentLoggedInUser.set(null);
      console.log('User signed out');
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }
}
