import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board} from '../models/board';
import {BoardsService} from '../services/boards.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private boardsService: BoardsService) {
  }

  @Input() type: string;
  @Input() idBoard: number;
  @Input() idTask: number;
  @Input() idStage: number;

  @Output() eventCloseDialog: EventEmitter<null> = new EventEmitter<null>();

  ngOnInit() {
  }

  closeDialog = () => {
    this.type = '';
    this.eventCloseDialog.emit();
  }

  createBoard = (newBoard: Board): void => {
    this.boardsService.addBoard(newBoard);
    this.closeDialog();
  }
}


