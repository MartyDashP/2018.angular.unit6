import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BoardsService} from '../../boards.service';
import {Task} from '../../task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  @Input() idBoard: number;
  @Input() idTask: number;
  @Output() eventSuccessfulOperation: EventEmitter<null> = new EventEmitter<null>();

  title: FormControl;
  discriptions: FormControl;
  responsible: FormControl;

  constructor(private boardsService: BoardsService) {
    this.title = new FormControl('', [Validators.required]);
    this.discriptions = new FormControl('');
    this.responsible = new FormControl('');
  }

  ngOnInit() {
  }

  createTask() {
    this.boardsService.addTask(
      this.idBoard,
      this.idTask,
      new Task(
        this.title.value,
        this.discriptions.value,
        this.responsible.value
      )
    );
    this.eventSuccessfulOperation.emit();
  }
}
