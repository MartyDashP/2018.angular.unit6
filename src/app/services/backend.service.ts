import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BoardDTO} from '../models/board-dto';
import {Observable} from 'rxjs';

const URL = 'localhost:8080';

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {
  }

  getBoards = (): Observable<BoardDTO[]> => this.http.get<BoardDTO[]>(URL + '/boards');
}
