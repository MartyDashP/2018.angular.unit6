import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Task} from '../../../../models/task';
import {UnitTime} from '../../../../models/unit-time';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() task: Task;
  @Input() isLastStage: boolean;
  @Input() isFirstStage: boolean;
  @Output() eventMoveTask: EventEmitter<string> = new EventEmitter<string>();
  @Output() eventShowDetails: EventEmitter<null> = new EventEmitter<null>();

  remainingTime: string;
  private timer: number;

  constructor() {
    this.remainingTime = '';
  }

  ngOnInit() {
    this.timer = setInterval(() => this.remainingTime = this.getRemainingTime(), 1000);
  }

  private getRemainingTime = (): string => {
    let delta: number = this.task.deadline.getTime() - new Date().getTime();
    if (delta > 0) {
      let day: UnitTime = new UnitTime(Math.floor(delta / 1000 / 60 / 60 / 24), 'Дни');
      let hour: UnitTime = new UnitTime(Math.floor((delta / 1000 / 60 / 60) - day.value * 24), 'Часы');
      let min: UnitTime = new UnitTime(
        Math.floor((delta / 1000 / 60) - day.value * 24 * 60 - hour.value * 60),
        'Минуты'
      );
      let sec: UnitTime = new UnitTime(
        Math.floor((delta / 1000) - day.value * 24 * 60 * 60 - hour.value * 60 * 60 - min.value * 60),
        'Секунды');
      return day.getFullValue() + ', ' + hour.getFullValue() + ', ' + min.getFullValue() + ', ' + sec.getFullValue();
    }
    else {
      clearInterval(this.timer);
      return 'Время на выполнение задачи истекло!';
    }
  };

  // < - назад, > - вперед
  moveTask = (direction: string) => this.eventMoveTask.emit(direction);
  showDetails = () => this.eventShowDetails.emit();

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

}


