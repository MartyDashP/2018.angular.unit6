import {Stage} from './stage';

export class Board {
  id: number;
  name: string;
  stages: Stage[];

  constructor(id: number, name: string, stages: Stage[]) {
    this.id = id;
    this.name = name;
    this.stages = stages;
  }
}
