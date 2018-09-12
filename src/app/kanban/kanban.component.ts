import {Component, OnInit} from '@angular/core';
import {KanbanService} from '../services/kanban.service';
import {Board} from '../models/board';

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

  constructor(private kanbanService: KanbanService) {
    this.typeDialog = '';
  }

  ngOnInit(): void {
  }

  getBoards = (): Board[] => this.kanbanService.getBoards();
  isActiveBoard = (id: number): boolean => this.kanbanService.isActiveBoard(id);
  setIdActiveBoard = (id: number) => this.kanbanService.setIdActiveBoard(id);
  deleteBoard = (board: Board) => this.kanbanService.deleteBoard(board);

  hideDialog = () => this.typeDialog = '';
  showDialog = (type: string, idBoard?: number, idStage?: number, idTask?: number) => {
    this.typeDialog = type;
    this.idBoard = idBoard ? idBoard : null;
    this.idStage = idStage ? idStage : null;
    this.idTask = idTask ? idTask : null;
  };


  // moveTask = ($event: any) => this.boardsService.moveTask({
  //   'idBoard': this.getIdActiveBoard(),
  //   'idStage': $event.idStage,
  //   'idTask': $event.idTask,
  //   'direction': $event.direction
  // });


}
