import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor() {
  }

  @Input() typeDialog: string;
  @Input() idBoard: number;
  @Input() idTask: number;
  @Input() idStage: number;

  @Output() eventCloseDialog: EventEmitter<null> = new EventEmitter<null>();
  @Output() eventAddBoard: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
  }

  closeDialog = () => {
    this.typeDialog = '';
    this.eventCloseDialog.emit();
  };
}


