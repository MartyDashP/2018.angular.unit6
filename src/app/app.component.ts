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

  constructor(private boardsService: BoardsService) {
    this.typeDialog = '';
    //this.typeDialog = 'createTask';
  }

  hideDialog = () => this.typeDialog = '';
  getBoards = () => this.boardsService.getBoards();
  setActive = (id: number) => this.boardsService.setActive(id);
  isActive = (id: number) => this.boardsService.isActive(id);
  getIdActiveBoard = () => this.boardsService.getIdActiveBoard();
  deleteBoard = (idBoard: number) => this.boardsService.deleteBoard(idBoard);

    showDialog = (type: string, idBoard: number = null, idStage: number = null, idTask: number = null) => {
      this.typeDialog = type;
      this.idBoard = idBoard;
      this.idStage = idStage;
      this.idTask = idTask;
    }

}


