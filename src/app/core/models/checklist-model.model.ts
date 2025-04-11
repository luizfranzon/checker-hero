export interface ChecklistModel {
  id: string;
  createdAt: { seconds: number; nanoseconds: number };
  isPublic: boolean;
  ownerId: string;
  title: string;
  steps: CheckListStepModel[];
}

export interface CheckListStepModel {
  description: string;
  isMandatory: boolean;
  order: number;
}
