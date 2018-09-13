import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stage} from '../../../models/stage';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  @Input() stage: Stage;
  @Input() isLastStage: boolean;
  @Input() isFirstStage: boolean;
  @Output() eventMoveTask: EventEmitter<{ direction: string, idTask: number }> = new EventEmitter<{ direction: string, idTask: number }>();
  @Output() eventDialogAddTask: EventEmitter<null> = new EventEmitter<null>();
  @Output() eventShowDetails: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  addTask = () => this.eventDialogAddTask.emit();
  moveTask = ($event: string, idTask: number) => this.eventMoveTask.emit({'direction': $event, 'idTask': idTask});
  showDetails = (idTask: number) => this.eventShowDetails.emit(idTask);
}
