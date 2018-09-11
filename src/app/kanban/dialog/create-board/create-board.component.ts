import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Board} from '../../../models/board';
import {Stage} from '../../../models/stage';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  titleBoard: FormControl;
  stages: FormControl[];
  flagError: boolean;

  constructor() {
    this.flagError = false;
    this.titleBoard = new FormControl('', [Validators.required]);
    this.stages = [
      new FormControl('', [Validators.required]),
      new FormControl('', [Validators.required])
    ];
  }

  increment = () => this.stages.push(new FormControl('', [Validators.required]));
  decrement = (): void => {
    if (this.stages.length > 2)
      this.stages.pop();
  };

  createBoard = () => {
    this.flagError = this.titleBoard.invalid;
    for (let state of this.stages) {
      if (!this.flagError)
        this.flagError = state.invalid;
    }

    if (!this.flagError) {
      let phases: Stage[] = [];
      for (let stage of this.stages)
        phases.push(new Stage(stage.value));
      this.eventCreateBoard.emit(new Board(this.titleBoard.value, phases));
    }
  };

  @Output()
  eventCreateBoard: EventEmitter<Board> = new EventEmitter<Board>();

  ngOnInit() {
  }

}
