export class Task {
  title: string;
  discription: string;
  deadline: Date;
  responsible: string;
  isDeadline: boolean;

  constructor(title: string, discription: string, responsible: string, isDeadline: boolean, deadline: Date = null) {
    this.title = title;
    this.discription = discription;
    this.responsible = responsible;
    this.deadline = deadline;
    this.isDeadline = isDeadline;
  }
}
