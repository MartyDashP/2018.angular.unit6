import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Board} from '../../models/board';
import {KanbanService} from '../../services/kanban.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Output() eventDialogAddTask: EventEmitter<{ idBoard: number, idStage: number }> =
    new EventEmitter<{ idBoard: number, idStage: number }>();
  @Output() eventShowDetails: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventMoveTask: EventEmitter<{ direction: string, idTask: number, idStage: number, idNextStage: number }> =
    new EventEmitter<{ direction: string, idTask: number, idStage: number, idNextStage: number }>();

  constructor(private kanbanService: KanbanService) {
  }

  ngOnInit() {
  }

  getActiveBoard = (): Board => this.kanbanService.getActiveBoard();
  getIdActiveBoard = (): number => this.kanbanService.getIdActiveBoard();

  addTask = (idBoard: number, idStage: number) => this.eventDialogAddTask.emit({
    'idBoard': idBoard,
    'idStage': idStage
  });

  moveTask = (idBoard: number, idStage: number, idTask: number, idNextStage: number) =>
    this.kanbanService.moveTask(idBoard, idStage, idTask, idNextStage);


  showDetailsOfTask = (idTask: number) => this.eventShowDetails.emit(idTask);
}


