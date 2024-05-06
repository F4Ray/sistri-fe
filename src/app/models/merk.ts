import { IMerk, IMerkRequest } from "../interfaces/i-merk";

export class Merk implements IMerk {
  merkID: number;
  merk: string;
  dealerCode: string;

  constructor() {
    this.merkID = 0;
    this.merk = '';
    this.dealerCode = '';
  }
}


export class MerkRequest implements IMerkRequest {
  merk: string;
  constructor() {
    this.merk = '';
  }
}