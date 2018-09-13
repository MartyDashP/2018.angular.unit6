import {Injectable, OnDestroy} from '@angular/core';
import {Board} from '../models/board';
import {BackendService} from './backend.service';
import {Stage} from '../models/stage';
import {Task} from '../models/task';
import {Subscription} from 'rxjs';

@Injectable()
export class KanbanService implements OnDestroy{

  private boards: Board[] = [];
  private idActiveBoard: number = null;

  subscrs: Subscription[] = [];

  constructor(private backendService: BackendService) {
  }

  getBoards = (): Board[] => this.boards;
  getActiveBoard = (): Board => this.idActiveBoard !== null ? this.boards.filter(board => board.id === this.idActiveBoard)[0] : null;
  setIdActiveBoard = (id: number) => this.idActiveBoard = id;
  getIdActiveBoard = (): number => this.idActiveBoard;
  isActiveBoard = (id: number): boolean => this.idActiveBoard === id ? true : false;

  deleteBoard = (board: Board) => {
    this.subscrs.push(this.backendService.deleteBoardObj(board).subscribe());
    this.idActiveBoard = this.boards.length !== 0 ? this.boards[0].id : null;
  };

  addBoard = (board: Board) => this.subscrs.push(this.backendService.addBoardObj(board).subscribe());

  addTask = (idBoard: number, idStage: number, task: Task) => {
    task.stageId = idStage;
    this.subscrs.push(this.backendService.addTask(task).subscribe());
  };

  getTask = (idTask: number) => this.backendService.getCollection<Stage, Task>(
    this.backendService.getCollection<Board, Stage>(this.boards, 'stages'), 'tasks')
    .filter(task => task.id === idTask)[0];

  moveTask = (idBoard: number, idStage: number, idTask: number, idNextStage: number) => {
    let task = this.getTask(idTask);
    task.stageId = idNextStage;
    this.subscrs.push(this.backendService.updTask(task).subscribe());
  };

  refreshBoards = () => {
    this.subscrs.push(this.backendService.getBoardsObj()
      .subscribe(boards => {
        this.boards = boards;
        this.idActiveBoard = boards.length !== 0 ? boards[0].id : null;
      }))
  };

  ngOnDestroy(): void {
    this.subscrs.map(subscr => subscr.unsubscribe());
  }



}
