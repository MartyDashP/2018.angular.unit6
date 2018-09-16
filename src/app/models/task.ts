export class Task {
  name: string;
  description: string;
  executor: string;
  id: number;
  priority: number;
  stageId: number;

  constructor(title: string, description: string, responsible: string) {
    this.name = title;
    this.description = description;
    this.executor = responsible;
  }


}
