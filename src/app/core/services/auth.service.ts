import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);

  constructor() {
    this.initAuthState();
  }

  public currentLoggedInUser = signal<null | User>(null);

  private async initAuthState() {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentLoggedInUser.set(user); // Atualiza o sinal com o usuário autenticado
        this.router.navigate(['/home']); // Redireciona para home após login
        console.log('Usuário autenticado:', user);
        return;
      }

      this.currentLoggedInUser.set(null);
      this.router.navigate(['/login']);
      console.log('Nenhum usuário autenticado.');
    });
  }

  public async signInWithGithub() {
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(this.firebaseAuth, provider);
      const user = result.user;
      this.currentLoggedInUser.set(user);
      this.router.navigate(['/home']);
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
      this.router.navigate(['/login']);
      console.log('User signed out');
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }

  public isLoggedIn(): boolean {
    return !!this.currentLoggedInUser();
  }
}
