import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, forkJoin, Observable} from 'rxjs';
import {Board} from '../models/board';
import {Stage} from '../models/stage';
import {Task} from '../models/task';
import {map, switchMap} from 'rxjs/operators';

const URL = 'http://localhost:8080';

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {
  }

  // REST-API
  getBoards = (): Observable<Board[]> => this.http.get<Board[]>(`${URL}/boards`);
  addBoard = (board: Board): Observable<Board> => this.http.post<Board>(`${URL}/boards`, board);
  getBoard = (id: number): Observable<Board> => this.http.get<Board>(`${URL}/boards/${id}`);
  pdBoard = (board: Board): Observable<Board> => this.http.put<Board>(`${URL}/boards/${board.id}`, board);
  delBoard = (id: number): Observable<null> => this.http.delete<null>(`${URL}/board/${id}`);

  getStages = (): Observable<Stage[]> => this.http.get<Stage[]>(`${URL}/stages`);
  addStage = (stage: Stage): Observable<Stage> => this.http.post<Stage>(`${URL}/stages`, stage);
  getStage = (id: number): Observable<Stage> => this.http.get<Stage>(`${URL}/stages/${id}`);
  updStage = (stage: Stage): Observable<Stage> => this.http.put<Stage>(`${URL}/stages/${stage.id}`, stage);
  delStage = (id: number): Observable<null> => this.http.delete<null>(`${URL}/stages/${id}`);

  getTasksOfStage = (id: number): Observable<Task[]> => this.http.get<Task[]>(`${URL}/stages/${id}` + '/tasks');
  getTasks = (): Observable<Task[]> => this.http.get<Task[]>(`${URL}/tasks`);
  addTask = (task: Task): Observable<Task> => this.http.post<Task>(`${URL}/tasks`, task);
  getTask = (id: number): Observable<Task> => this.http.get<Task>(`${URL}/tasks/${id}`);
  updTask = (task: Task): Observable<Task> => this.http.put<Task>(`${URL}/tasks/${task.id}`, task);
  delTask = (id: number): Observable<null> => this.http.delete<null>(`${URL}/tasks/${id}`);

  // custom

  deleteBoardObj = (board: Board) => forkJoin(
    this.deleteTasks(this.getCollection<Stage, Task>(board.stages, 'tasks')),
    this.deleteStages(board.stages),
    this.delBoard(board.id)
  );

  deleteStages = (stages: Stage[]) => combineLatest(stages.map(stage => this.delStage(stage.id)));
  deleteTasks = (tasks: Task[]) => combineLatest(tasks.map(task => this.delTask(task.id)));

  addBoardObj = (board: Board) => this.addBoard(board)
    .pipe(
      switchMap(brd => this.addStages(board.stages.map(stage => {
        stage.boardId = brd.id;
        return stage;
      })))
    );

  addStages = (stages: Stage[]) => combineLatest(stages.map(stage => this.addStage(stage)));

  getBoardsObj = () => forkJoin([this.getBoards(), this.getStages(), this.getTasks()])
    .pipe(
      map(result => result[0].map(board => {
        let brd = board;
        brd.stages = result[1].filter(stage => stage.boardId === brd.id);
        brd.stages.map(stage => stage.tasks = result[2].filter(task => task.stageId === stage.id));
        return brd;
      }))
    );

  getCollection = <T1, T2>(arrObj: T1[], prop: string): T2[] => {
    let arr: T2[] = [];
    arrObj.map(obj => obj[prop].map(_item => arr.push(_item)));
    return arr;
  };


}
