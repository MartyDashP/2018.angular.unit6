export class Task {
  title: string;
  discription: string;
  deadline: Date;
  responsible: string;

  constructor(title: string, discription: string, responsible: string, deadline = null) {
    this.title = title;
    this.discription = discription;
    this.responsible = responsible;
    this.deadline = deadline;
  }
}
