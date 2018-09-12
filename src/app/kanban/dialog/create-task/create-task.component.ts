import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../../models/task';
import {Subscription} from 'rxjs';
import {KanbanService} from '../../../services/kanban.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  @Input() idBoard: number;
  @Input() idStage: number;
  @Output() eventSuccessfulOperation: EventEmitter<null> = new EventEmitter<null>();

  title: FormControl;
  descriptions: FormControl;
  responsible: FormControl;
  isDeadline: boolean;
  flagError: boolean;
  flagErrorDeadline: boolean;
  deadline: FormGroup;

  flagsFilter = {
    'months': true,
    'days': true,
    'hours': true,
    'minuts': true
  };

  subscriptions: Subscription[] = [];

  private now: Date;

  constructor(private kanbanService: KanbanService) {
    this.isDeadline = false;
    this.flagError = false;
    this.flagErrorDeadline = false;
    this.now = new Date();
    this.initControls();
  }

  initControls = () => {
    this.title = new FormControl('', [Validators.required]);
    this.descriptions = new FormControl('');
    this.responsible = new FormControl('', [Validators.required]);
    this.deadline = new FormGroup({
      day: new FormControl(this.now.getDate(), [Validators.required]),
      month: new FormControl(this.now.getMonth() + 1, [Validators.required]),
      year: new FormControl(this.now.getFullYear(), [Validators.required]),
      hour: new FormControl(this.now.getHours(), [Validators.required]),
      minute: new FormControl(this.now.getMinutes(), [Validators.required])
    });
  };

  ngOnInit() {
    this.subscriptions.push(this.deadline.controls.year.valueChanges
      .subscribe(value => this.flagsFilter.months = (value === this.now.getFullYear()))
    );
    this.subscriptions.push(this.deadline.controls.month.valueChanges
      .subscribe(value => this.flagsFilter.days = (value === this.now.getMonth() + 1))
    );
    this.subscriptions.push(this.deadline.controls.day.valueChanges
      .subscribe(value => this.flagsFilter.hours = (value === this.now.getDate()))
    );
    this.subscriptions.push(this.deadline.controls.hour.valueChanges
      .subscribe(value => this.flagsFilter.minuts = (value === this.now.getHours()))
    );
  }

  private counter = (start: number, end: number): number[] => {
    let arr: number[] = [];
    for (let i: number = start; i <= end; i++)
      arr.push(i);
    return arr;
  };

  createTask() {
    let deadline = new Date();
    this.flagError = this.title.invalid || this.responsible.invalid;
    if (this.isDeadline === true) {
      this.flagErrorDeadline = this.deadline.invalid;
      deadline = new Date(
        this.deadline.controls.year.value,
        this.deadline.controls.month.value - 1,
        this.deadline.controls.day.value,
        this.deadline.controls.hour.value,
        this.deadline.controls.minute.value
      );
    }

    if (!this.flagError && !this.flagErrorDeadline) {
      this.kanbanService.addTask(
        this.idBoard,
        this.idStage,
        new Task(
          this.kanbanService.getNextIdTask(),
          this.title.value,
          this.descriptions.value,
          this.responsible.value,
          this.isDeadline,
          deadline
        )
      );
      this.eventSuccessfulOperation.emit();
    }
  }

  getDaysInMonth = (year: number, month: number): number => 33 - new Date(year, month, 33).getDate();
  getYears = (): number[] => this.counter(this.now.getFullYear(), this.now.getFullYear() + 3);
  getMonths = () => this.flagsFilter.months ? this.counter(new Date().getMonth() + 1, 12) : this.counter(1, 12);
  getHours = () => this.flagsFilter.hours ? this.counter(new Date().getHours(), 23) : this.counter(0, 23);
  getMinutes = () => this.flagsFilter.minuts ? this.counter(new Date().getMinutes(), 59) : this.counter(0, 59);
  getDays = () => {
    if (this.flagsFilter.days) {
      return this.counter(new Date().getDate(), this.getDaysInMonth(this.deadline.controls.year.value, this.deadline.controls.month.value - 1));
    } else {
      return this.counter(1, this.getDaysInMonth(this.deadline.controls.year.value, this.deadline.controls.month.value - 1));
    }
  };

  ngOnDestroy(): void {
    this.subscriptions.map(subscr => subscr.unsubscribe());
  }
}
