import type { ChecklistModel } from '../models/checklist-model.model';
import { collection, getDocs, query } from 'firebase/firestore';
import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChecklistModelsService {
  private firestore = inject(Firestore);

  public async getChecklistModels(): Promise<ChecklistModel[]> {
    const checklistModelsRef = collection(this.firestore, 'checklist-models');
    const q = query(checklistModelsRef);

    const querySnapshot = await getDocs(q);

    const checklistModels = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ChecklistModel[];

    return checklistModels;
  }
}
