import {Injectable} from '@angular/core';
import {Board} from '../models/board';
import {BackendService} from './backend.service';
import {Stage} from '../models/stage';
import {Task} from '../models/task';

@Injectable()
export class KanbanService {

  private boards: Board[] = [];
  private idActiveBoard: number = null;

  constructor(private backendService: BackendService) {
    this.boards.push(new Board(1, 'test 1', [new Stage(1, 'start'), new Stage(2, 'end')]));
    this.boards.push(new Board(2, 'test 2', [new Stage(3, 'first'), new Stage(4, 'last')]));
    this.boards[0].stages[0].tasks.push(new Task(1, 'asd', 'ads', 'asdasd', false));
    this.boards[1].stages[1].tasks.push(new Task(19, 'asdasd', 'aasdds', 'asdasd', false));
    this.boards[1].stages[0].tasks.push(new Task(3, 'zxczxasd', 'ads', 'asdasd', false));
    this.idActiveBoard = 1;
  }

  getBoards = (): Board[] => this.boards;
  getActiveBoard = (): Board => this.idActiveBoard !== null ? this.boards.filter(board => board.id === this.idActiveBoard)[0] : null;
  setIdActiveBoard = (id: number) => this.idActiveBoard = id;
  getIdActiveBoard = (): number => this.idActiveBoard;
  isActiveBoard = (id: number): boolean => this.idActiveBoard === id ? true : false;

  //  функции получения id для новых записей
  private findLastId = <T>(array: T[]): number => Math.max.apply(null, array.map(board => board.id));
  getNextIdBoard = (): number => 1 + this.findLastId<Board>(this.boards);
  getNextIdStage = (): number => 1 + this.findLastId<Stage>(
    this.getCollection<Board, Stage>(this.boards, 'stages')
  )
  getNextIdTask = (): number => 1 + this.findLastId<Task>(
    this.getCollection<Stage, Task>(
      this.getCollection<Board, Stage>(this.boards, 'stages'), 'tasks'
    )
  )

  deleteBoard = (board: Board) => {
    this.boards = this.boards.filter(brd => board !== brd);
    this.idActiveBoard = this.boards.length !== 0 ? this.boards[0].id : null;
  }

  addBoard = (board: Board) => {
    this.boards.push(board);
    console.log(board);
  }

  addTask = (idBoard: number, idStage: number, task: Task) =>
    this.boards.map(board => board.id === idBoard ? board.stages
      .map(stage => stage.id === idStage ? stage.tasks.push(task) : null) : null);

  getTask = (idTask: number) => this.getCollection<Stage, Task>(
    this.getCollection<Board, Stage>(this.boards, 'stages'), 'tasks'
  ).filter(task => task.id === idTask)[0];

  moveTask = (idBoard: number, idStage: number, idTask: number, idNextStage: number) => {
    let tsk = this.getTask(idTask);

    this.boards.filter(board => board.id === idBoard)[0]
      .stages.map(stage => stage.id !== idStage ? stage : stage.tasks = stage.tasks.filter(task => task.id !== idTask));

    this.boards.filter(board => board.id === idBoard)[0]
      .stages.filter(stage => stage.id === idNextStage)[0]
      .tasks.push(tsk);

  }


  refreshBoards = () => {
    const sub = this.backendService.getBoardsObj()
      .subscribe(boards => {
        this.boards = boards;
        this.idActiveBoard = boards.length !== 0 ? boards[0].id : null;
      });
  }

  refreshActiveBoard = () => {
    const sub = this.backendService.getBoardObj(this.idActiveBoard).subscribe(board => this.boards[this.idActiveBoard] = board);
    sub.unsubscribe();
  }

  getCollection = <T1, T2>(arrObj: T1[], prop: string): T2[] => {
    let arr: T2[] = [];
    arrObj.map(obj => obj[prop].map(_item => arr.push(_item)));
    return arr;
  }


}
