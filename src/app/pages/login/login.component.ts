import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonModule],
})
export class LoginComponent {
  private authService = inject(AuthService);

  public async handleLogin() {
    try {
      await this.authService.signInWithGithub();
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
