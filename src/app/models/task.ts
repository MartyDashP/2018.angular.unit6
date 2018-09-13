export class Task {
  name: string;
  description: string;
  deadline: Date;
  executor: string;
  isDeadline: boolean;
  id: number;
  priority: number;
  stageId: number;

  constructor(title: string, description: string, responsible: string, isDeadline: boolean, deadline: Date = null) {
    this.name = title;
    this.description = description;
    this.executor = responsible;
    this.deadline = deadline;
    this.isDeadline = isDeadline;
  }
}
