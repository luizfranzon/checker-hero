import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import type { User } from '@angular/fire/auth';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private authService = inject(AuthService);

  public user = signal<null | User>(this.authService.currentLoggedInUser());

  public handleSignIn() {
    this.authService
      .signInWithGithub()
      .then(() => {
        this.user.set(this.authService.currentLoggedInUser());
        console.log('Sign-in successful!');
      })
      .catch((error) => {
        console.error('Sign-in failed:', error);
      });
  }

  public handleSignOut() {
    this.authService
      .signOut()
      .then(() => {
        this.user.set(null);
        console.log('Sign-out successful!');
      })
      .catch((error) => {
        console.error('Sign-out failed:', error);
      });
  }
}
