import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Board} from '../models/board';
import {Stage} from '../models/stage';
import {Task} from '../models/task';
import {map} from 'rxjs/operators';

const URL = 'http://localhost:8080';

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {
  }

  // REST-API
  getBoards = (): Observable<Board[]> => this.http.get<Board[]>(`${URL}/boards`);
  private addBoard = (board: Board): Observable<Board> => this.http.post<Board>(`${URL}/boards`, board);
  private getBoard = (id: number): Observable<Board> => this.http.get<Board>(`${URL}/boards/${id}`);
  private updBoard = (board: Board): Observable<Board> => this.http.put<Board>(`${URL}/boards/${board.id}`, board);
  private delBoard = (id: number): Observable<null> => this.http.delete<null>(`${URL}/board/${id}`);

  getStages = (): Observable<Stage[]> => this.http.get<Stage[]>(`${URL}/stages`);
  private addStage = (stage: Stage): Observable<Stage> => this.http.post<Stage>(`${URL}/stages`, stage);
  private getStage = (id: number): Observable<Stage> => this.http.get<Stage>(`${URL}/stages/${id}`);
  private updStage = (stage: Stage): Observable<Stage> => this.http.put<Stage>(`${URL}/stages/${stage.id}`, stage);
  private delStage = (id: number): Observable<null> => this.http.delete<null>(`${URL}/stages/${id}`);

  private getTasksOfStage = (id: number): Observable<Task[]> => this.http.get<Task[]>(`${URL}/stages/${id}` + '/tasks');
  getTasks = (): Observable<Task[]> => this.http.get<Task[]>(`${URL}/tasks`);
  private addTask = (task: Task): Observable<Task> => this.http.post<Task>(`${URL}/tasks`, task);
  private getTask = (id: number): Observable<Task> => this.http.get<Task>(`${URL}/tasks/${id}`);
  private updTask = (task: Task): Observable<Task> => this.http.put<Task>(`${URL}/tasks/${task.id}`, task);
  private delTask = (id: number): Observable<null> => this.http.delete<null>(`${URL}/tasks/${id}`);

  // custom
  getStagesOfBoardsObj = (id: number): Observable<Stage[]> => this.getStages()
    .pipe(
      map(stages => stages.filter(stg => stg.boardId === id)),
      map(stages => {
        stages.forEach((stage) => {
          let sub = this.getTasksOfStage(stage.id)
            .pipe(
            ).subscribe(tasks => stage.tasks = tasks);
        });
        return stages;
      })
    );

  getBoardObj = (id: number): Observable<Board> => this.getBoard(id)
    .pipe(
      map(board => {
        // В общем не получается switchMap юзать для изменения отдельных свойств объекта
        // Буду признателен если вы расскажите как :)
        let sub = this.getStagesOfBoardsObj(id).subscribe(stages => board.stages = stages);
        return board;
      })
    );

  getBoardsObj = (): Observable<Board[]> => this.getBoards()
    .pipe(
      map(boards => {
        boards.forEach((board) => {
          let sub = this.getStagesOfBoardsObj(board.id).subscribe(stages => board.stages = stages);
        });
        return boards;
      })
    );

  deleteBoardObj = (board: Board) => {
    board.stages.forEach(stage => {
      stage.tasks.forEach(task => this.delTask(task.id).subscribe());
      this.delStage(stage.id).subscribe();
    })
    this.delBoard(board.id).subscribe();
  }

  addBoardObj = (board: Board) => {
    let maxStageId =
    board.stages.forEach(stage => {

    })
  }

}
