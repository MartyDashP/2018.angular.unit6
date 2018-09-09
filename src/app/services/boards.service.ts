import { Injectable } from '@angular/core';
import {Board} from '../models/board';
import {Stage} from '../models/stage';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private boards: Board[];
  private idActive: number;

  constructor() {
    this.boards = [
      new Board('Стандарт', [new Stage('Планы'), new Stage('Выполнено')])
    ];
    this.idActive = 0;
  }

  addBoard = (newBoard: Board) => this.idActive = this.boards.push(newBoard) - 1;
  addTask = (idBoard: number, idStage: number, newTask: Task) => this.boards[idBoard].stages[idStage].tasks.push(newTask);
  getBoards = () => this.boards;
  getActiveBoard = () => this.idActive !== null ? this.boards[this.idActive] : null;
  getIdActiveBoard = () => this.idActive;
  getTask = (idBoard: number, idStage: number, idTask: number): Task => this.boards[idBoard].stages[idStage].tasks[idTask];
  setActive = (id: number) => this.idActive = id;
  isActive = (id: number) => id === this.idActive;
  deleteBoard = (idBoard: number) => this.boards.splice(idBoard, 1);

  moveTask = (data: any) => {
    let task: Task = this.boards[this.idActive].stages[data.idStage].tasks[data.idTask];
    this.boards[this.idActive].stages[data.idStage].tasks.splice(data.idTask, 1);

    if (data.direction === '<')
      this.boards[this.idActive].stages[data.idStage - 1].tasks.push(task);
    else
      this.boards[this.idActive].stages[data.idStage + 1].tasks.push(task);
  }

}


