import {Injectable, OnDestroy} from '@angular/core';
import {Board} from '../models/board';
import {BackendService} from './backend.service';
import {Stage} from '../models/stage';
import {Task} from '../models/task';
import {Subject, Subscription} from 'rxjs';
import {repeatWhen} from 'rxjs/operators';

@Injectable()
export class KanbanService implements OnDestroy{

  private boards: Board[] = [];
  private idActiveBoard: number = null;

  refresherBoards = new Subject();
  subsBoards: Subscription;

  constructor(private backendService: BackendService) {
  }

  getBoards = (): Board[] => this.boards;
  getActiveBoard = (): Board => this.idActiveBoard !== null ? this.boards.filter(board => board.id === this.idActiveBoard)[0] : null;
  setIdActiveBoard = (id: number) => this.idActiveBoard = id;
  getIdActiveBoard = (): number => this.idActiveBoard;
  isActiveBoard = (id: number): boolean => this.idActiveBoard === id ? true : false;

  deleteBoard = (board: Board) => {
    const subs = this.backendService.deleteBoardObj(board).subscribe(() => {
      this.idActiveBoard = null;
      this.refresherBoards.next();
      subs.unsubscribe();
    });
  };

  addBoard = (board: Board) => {
    const subs = this.backendService.addBoardObj(board)
      .subscribe(() => {
        this.idActiveBoard = board.id;
        this.refresherBoards.next();
      });
  };

  addTask = (idBoard: number, idStage: number, task: Task) => {
    task.stageId = idStage;
    const subs = (this.backendService.addTask(task).subscribe(() => {
      this.refresherBoards.next();
      subs.unsubscribe();
    }));
  };

  getTask = (idTask: number) => this.backendService.getCollection<Stage, Task>(
    this.backendService.getCollection<Board, Stage>(this.boards, 'stages'), 'tasks')
    .filter(task => task.id === idTask)[0];

  moveTask = (idBoard: number, idStage: number, idTask: number, idNextStage: number) => {
    const task = this.getTask(idTask);
    task.stageId = idNextStage;
    const subs = this.backendService.updTask(task).subscribe(() => {
      this.refresherBoards.next();
      subs.unsubscribe();
    });
  };

  refreshBoards = () => {
    this.subsBoards = this.backendService.getBoardsObj()
      .pipe(repeatWhen(() => this.refresherBoards))
      .subscribe(boards => {
        this.boards = boards;
        this.idActiveBoard = boards.length !== 0 ? (this.idActiveBoard ? this.idActiveBoard : boards[0].id) : null;
      });
  };

  ngOnDestroy(): void {
    this.subsBoards.unsubscribe();
  }


}
