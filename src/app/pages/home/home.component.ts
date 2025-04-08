import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent],
})
export class HomeComponent {}
