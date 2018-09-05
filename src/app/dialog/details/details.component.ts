import {Component, Input, OnInit} from '@angular/core';
import {BoardsService} from '../../boards.service';
import {Task} from '../../task';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() idBoard: number;
  @Input() idStage: number;
  @Input() idTask: number;

  constructor(private boardsService: BoardsService) { }

  ngOnInit() {
  }

  getTask = (): Task => this.boardsService.getTask(this.idBoard, this.idStage, this.idTask);

}
