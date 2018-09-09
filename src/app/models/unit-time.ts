export class UnitTime {
  readonly unit: string;
  readonly value: number;

  constructor(value: number, unit: string) {
    this.value = value;
    this.unit = unit;
  }

  getFullValue = (): string => (this.unit + ': ' + this.value.toString());
}
