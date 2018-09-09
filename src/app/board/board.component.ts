import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Stage} from '../models/stage';
import {Task} from '../models/task';
import {BoardsService} from '../services/boards.service';
import {Board} from '../models/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Output() eventAddTaskFromBoard: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventShowDetailsOfTask: EventEmitter<any> = new EventEmitter<any>();

  constructor(private boardService: BoardsService) {
  }

  ngOnInit() {
  }

  getActiveBoard = () => this.boardService.getActiveBoard();
  addTask = (idStage: number) => this.eventAddTaskFromBoard.emit(idStage);

  moveTask = ($event: any, idStage: number) => this.boardService.moveTask({
    'direction': $event.direction,
    'idTask': $event.idTask,
    'idStage': idStage
    })

  showDetailsOfTask = (idStage: number, idTask: number) => this.eventShowDetailsOfTask.emit({
    'idStage': idStage,
    'idTask': idTask
  })


}

