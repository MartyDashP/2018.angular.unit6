import {Component, Input} from '@angular/core';
import {Board} from './models/board';
import {BoardsService} from './services/boards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  typeDialog: string;
  idBoard: number;
  idStage: number;
  idTask: number;
  private idActiveBoard: number;

  constructor(private boardsService: BoardsService) {
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


