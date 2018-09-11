import {Component, OnInit} from '@angular/core';
import {BoardDTO} from '../models/board-dto';
import {Subscription} from 'rxjs';
import {BoardsService} from '../services/boards.service';
import {BackendService} from '../services/backend.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  typeDialog: string;
  idBoard: number;
  idStage: number;
  idTask: number;
  private idActiveBoard: number;

  boardsDTO: BoardDTO[];

  subscriptionGetBoards: Subscription;

  ngOnInit() {
    this.subscriptionGetBoards = this.backendService
      .getBoards()
      .subscribe((boardsDTO: BoardDTO[]) => this.boardsDTO = boardsDTO);
  }

  constructor(private boardsService: BoardsService, private backendService: BackendService) {
    this.typeDialog = '';
    this.setActive(0);
  }

  setActive = (id: number) => this.idActiveBoard = id;
  isActive = (id: number) => this.idActiveBoard === id ? true : false;
  getIdActiveBoard = () => this.idActiveBoard;

  hideDialog = () => this.typeDialog = '';
  getBoards = () => this.boardsService.getBoards();
  deleteBoard = (idBoard: number) => {
    this.boardsService.deleteBoard(idBoard);
    let amt = this.boardsService.getBoards().length;
    if (amt > 0)
      this.setActive(amt - 1);
    else
      this.setActive(null);

  };

  showDialog = (type: string, idBoard: number = null, idStage: number = null, idTask: number = null) => {
    this.typeDialog = type;
    this.idBoard = idBoard;
    this.idStage = idStage;
    this.idTask = idTask;
  };

  moveTask = ($event: any) => this.boardsService.moveTask({
    'idBoard': this.getIdActiveBoard(),
    'idStage': $event.idStage,
    'idTask': $event.idTask,
    'direction': $event.direction
  });


}
