
import { ICar, ICarRequest } from "../interfaces/i-car";
import { IMerk } from "../interfaces/i-merk";

export class Car implements ICar{
  carID: number;
  tipe: string;
  merkID: IMerk;
  createdBy: number;
  createdAt: number;
  updatedBy: number | null;
  updatedAt: number;

  constructor() {
    this.carID = 0;
    this.tipe = '';
    this.merkID = {
      merkID: 0,
      merk: '',
      dealerCode: '',
    };
    this.createdBy= 0;
    this.createdAt= 0;
    this.updatedBy= 0;
    this.updatedAt= 0;
  }
}


export class CarRequest implements ICarRequest {
  tipe: string;
  merkID: number;

  constructor() {
    this.tipe = '';
    this.merkID = 0;
  }
}