import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stage} from '../stage';
import {Task} from '../task';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  @Input() stage: Stage;
  @Input() isLastStage: boolean;
  @Input() isFirstStage: boolean;
  @Output() eventMoveTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventAddTaskFromStage: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }

  addTask = () => this.eventAddTaskFromStage.emit();
  moveTask = ($event: string, idTask: number) => this.eventMoveTask.emit({'direction': $event, 'idTask': idTask});
}
