import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoardsService} from '../../services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() idActiveBoard: number;
  @Output() eventAddTaskFromBoard: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventShowDetailsOfTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventMoveTask: EventEmitter<any> = new EventEmitter<any>();

  constructor(private boardService: BoardsService) {
  }

  ngOnInit() {
  }

  getActiveBoard = () => this.boardService.getBoard(this.idActiveBoard);
  addTask = (idStage: number) => this.eventAddTaskFromBoard.emit(idStage);

  moveTask = ($event: any, idStage: number) => this.eventMoveTask.emit({
    'direction': $event.direction,
    'idTask': $event.idTask,
    'idStage': idStage
  });

  showDetailsOfTask = (idStage: number, idTask: number) => this.eventShowDetailsOfTask.emit({
    'idStage': idStage,
    'idTask': idTask
  });


}

