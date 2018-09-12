import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Board} from '../../../models/board';
import {Stage} from '../../../models/stage';
import {KanbanService} from '../../../services/kanban.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent {

  titleBoard: FormControl;
  stages: FormControl[];
  flagError: boolean;

  @Output() eventSuccessfulOperation: EventEmitter<null> = new EventEmitter<null>();

  constructor(private kanbanService: KanbanService) {
    this.flagError = false;
    this.titleBoard = new FormControl('', [Validators.required]);
    this.stages = [
      new FormControl('', [Validators.required]),
      new FormControl('', [Validators.required])
    ];
  }

  increment = () => this.stages.push(new FormControl('', [Validators.required]));
  decrement = () => this.stages.length > 2 ? this.stages.pop() : null;

  createBoard = () => {
    //  валидности
    this.flagError = this.titleBoard.invalid;
    this.stages.map(stage => this.flagError = this.flagError === false ? stage.invalid : false);

    if (!this.flagError) {
      let phases: Stage[] = [];
      let lastIdStage: number = this.kanbanService.getNextIdStage() - 1;
      this.stages.map(stage => phases.push(new Stage(lastIdStage++, stage.value)));
      this.kanbanService.addBoard(new Board(this.kanbanService.getNextIdBoard(), this.titleBoard.value, phases));
      this.eventSuccessfulOperation.emit();
    }
  };

}
