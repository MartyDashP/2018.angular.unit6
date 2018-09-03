import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() isLastStage: boolean;
  @Input() isFirstStage: boolean;
  @Output() eventMoveTask: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  // < - назад, > - вперед
  moveTask = (direction: string) => this.eventMoveTask.emit(direction);

}
