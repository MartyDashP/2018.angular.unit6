import {Stage} from './stage';

export class Board {
  name: string;
  stages: Stage[];

  constructor(name: string, stages: Stage[]) {
    this.name = name;
    this.stages = stages;
  }
}
