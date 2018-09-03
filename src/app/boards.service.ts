import { Injectable } from '@angular/core';
import {Board} from './board';
import {Stage} from './stage';
import {Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private boards: Board[];
  private idActive: number;

  constructor() {
    this.boards = [
      new Board('test', [new Stage('test'), new Stage('testt')]),
      new Board('test2', [new Stage('test'), new Stage('testt'), new Stage('testt3')])
    ];
    this.idActive = 0;
    // this.boards = [];
    // this.idActive = null;
  }

  addBoard = (newBoard: Board) => this.idActive = this.boards.push(newBoard) - 1;
  addTask = (idBoard: number, idStage: number, newTask: Task) => this.boards[idBoard].stages[idStage].tasks.push(newTask);
  getBoards = () => this.boards;
  getActiveBoard = () => this.idActive !== null ? this.boards[this.idActive] : null;
  getIdActiveBoard = () => this.idActive;
  setActive = (id: number) => this.idActive = id;
  isActive = (id: number) => id === this.idActive;

  moveTask = (data: any) => {
    let task: Task = this.boards[this.idActive].stages[data.idStage].tasks[data.idTask];
    this.boards[this.idActive].stages[data.idStage].tasks.splice(data.idTask, 1);


    if (data.direction === '<')
      this.boards[this.idActive].stages[data.idStage - 1].tasks.push(task);
    else
      this.boards[this.idActive].stages[data.idStage + 1].tasks.push(task);
  }
}


