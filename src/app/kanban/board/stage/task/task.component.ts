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

  data: {isDeadline: boolean, deadline: number, description: string};
  remainingTime: string;
  private timer: number;

  constructor() {
    this.remainingTime = '';
  }

  ngOnInit() {
    this.data = JSON.parse(this.task.description);
    if (this.data.isDeadline) this.timer = setInterval(() => this.remainingTime = this.getRemainingTime(), 1000);
  }

  private getRemainingTime = (): string => {
    const delta: number = this.data.deadline - new Date().getTime();
    if (delta > 0) {
      const day: UnitTime = new UnitTime(Math.floor(delta / 1000 / 60 / 60 / 24), 'Дни');
      const hour: UnitTime = new UnitTime(Math.floor((delta / 1000 / 60 / 60) - day.value * 24), 'Часы');
      const min: UnitTime = new UnitTime(
        Math.floor((delta / 1000 / 60) - day.value * 24 * 60 - hour.value * 60),
        'Минуты'
      );
      const sec: UnitTime = new UnitTime(
        Math.floor((delta / 1000) - day.value * 24 * 60 * 60 - hour.value * 60 * 60 - min.value * 60),
        'Секунды');
      return `${day.getFullValue()}, ${hour.getFullValue()}, ${min.getFullValue()}, ${sec.getFullValue()}`;
    }

    clearInterval(this.timer);
    return 'Время на выполнение задачи истекло!';

  };

  // < - назад, > - вперед
  moveTask = (direction: string) => this.eventMoveTask.emit(direction);
  showDetails = () => this.eventShowDetails.emit();

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

}


