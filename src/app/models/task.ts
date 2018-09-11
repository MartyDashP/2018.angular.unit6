export class Task {
  name: string;
  discription: string;
  deadline: Date;
  executor: string;
  isDeadline: boolean;
  id: number;
  priority: number;
  stageId: number;

  constructor(title: string, discription: string, responsible: string, isDeadline: boolean, deadline: Date = null) {
    this.name = title;
    this.discription = discription;
    this.executor = responsible;
    this.deadline = deadline;
    this.isDeadline = isDeadline;
  }
}
