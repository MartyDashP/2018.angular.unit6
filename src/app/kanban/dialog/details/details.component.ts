import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../models/task';
import {KanbanService} from '../../../services/kanban.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() idTask: number;

  constructor(private kanbanService: KanbanService) {
  }

  ngOnInit() {
  }

  getTask = (): Task => this.kanbanService.getTask(this.idTask);

}
