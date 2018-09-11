import {Task} from './task';

export class Stage {
  id: number;
  name: string;
  description: string;
  boardId: number;
  tasks: Task[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
