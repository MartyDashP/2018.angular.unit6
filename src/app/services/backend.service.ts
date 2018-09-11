import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Board} from '../models/board';
import {Stage} from '../models/stage';
import {Task} from '../models/task';

const URL = 'localhost:8080';

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {
  }

  getBoards = (): Observable<Board[]> => this.http.get<Board[]>(URL + '/boards');
  addBoard = (board: Board): Observable<Board> => this.http.post<Board>(URL + '/boards', board);
  getBoard = (id: number): Observable<Board> => this.http.get<Board>(URL + '/boards/${id}');
  updBoard = (board: Board): Observable<Board> => this.http.put<Board>(URL + '/boards/${board.id}', board);
  delBoard = (id: number): Observable<null> => this.http.delete<null>(URL + '/board/${id}');

  getStages = (): Observable<Stage[]> => this.http.get<Stage[]>(URL + '/stages');
  addStage = (stage: Stage): Observable<Stage> => this.http.post<Stage>(URL + '/stages', stage);
  getStage = (id: number): Observable<Stage> => this.http.get<Stage>(URL + '/stages/${id}');
  updStage = (stage: Stage): Observable<Stage> => this.http.put<Stage>(URL + '/stages/${stage.id}', stage);
  delStage = (id: number): Observable<null> => this.http.delete<null>(URL + '/stages/${id}');

  getTasksOfStage = (): Observable<Task> => this.http.get<Task>(URL + '/stages/${id}/tasks');
  getTasks = (): Observable<Task> => this.http.get<Task>(URL + '/tasks');
  addTask = (task: Task): Observable<Task> => this.http.post<Task>(URL + '/tasks', task);
  getTask = (id: number): Observable<Task> => this.http.get<Task>(URL + '/tasks/${id}');
  updTask = (task: Task): Observable<Task> => this.http.put<Task>(URL + '/tasks/${id}', task);
  delTask = (id: number): Observable<null> => this.http.delete<null>(URL + '/tasks/${id}');
}
