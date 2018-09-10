import {Injectable} from '@angular/core';
import {Board} from '../models/board';
import {Stage} from '../models/stage';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private boards: Board[];

  constructor() {
    this.boards = [
      new Board('Стандарт', [new Stage('Планы'), new Stage('Выполнено')])
    ];

  }

  addBoard = (newBoard: Board): number => this.boards.push(newBoard) - 1;
  addTask = (idBoard: number, idStage: number, newTask: Task) => this.boards[idBoard].stages[idStage].tasks.push(newTask);
  getBoards = () => this.boards;
  getBoard = (idBoard: number) => idBoard !== null ? this.boards[idBoard] : null;
  getTask = (idBoard: number, idStage: number, idTask: number): Task => this.boards[idBoard].stages[idStage].tasks[idTask];
  deleteBoard = (idBoard: number) => this.boards.splice(idBoard, 1);

  moveTask = (data: any) => {
    let task: Task = this.boards[data.idBoard].stages[data.idStage].tasks[data.idTask];
    this.boards[data.idBoard].stages[data.idStage].tasks.splice(data.idTask, 1);

    if (data.direction === '<')
      this.boards[data.idBoard].stages[data.idStage - 1].tasks.push(task);
    else
      this.boards[data.idBoard].stages[data.idStage + 1].tasks.push(task);
  };

}


