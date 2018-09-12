import {Task} from './task';

export class Stage {
  id: number;
  name: string;
  description: string;
  boardId: number;
  tasks: Task[] = [];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
