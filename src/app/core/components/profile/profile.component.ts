import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import type { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MenuModule, AvatarModule],
})
export class ProfileComponent {
  private authService = inject(AuthService);
  public user = signal(this.authService.currentLoggedInUser());

  public items = signal<MenuItem[]>([
    {
      label: 'Log Out',
      icon: 'pi pi-fw pi-sign-out',
      command: () => this.handleLogout(),
    },
  ]);

  private handleLogout() {
    this.authService.signOut();
  }
}
