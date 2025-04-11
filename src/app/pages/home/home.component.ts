import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { ChecklistModelsService } from '../../core/services/checklist-models.service';
import type { ChecklistModel } from '../../core/models/checklist-model.model';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent, TabsModule],
})
export class HomeComponent {
  private checkListModelsSer = inject(ChecklistModelsService);

  public checklistModels = signal<ChecklistModel[]>([]);

  async ngOnInit() {
    await this.loadChecklistModels();
  }

  public async loadChecklistModels() {
    const checklistModels = await this.checkListModelsSer.getChecklistModels();
    this.checklistModels.set(checklistModels);
  }
}
