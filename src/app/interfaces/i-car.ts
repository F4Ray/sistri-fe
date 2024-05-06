import { IMerk } from "./i-merk";


export interface ICar {
  carID: number;
  merkID: IMerk;
  tipe: string;
  createdBy: number;
  createdAt: number;
  updatedBy: number | null;
  updatedAt: number;
}


export interface ICarRequest {
  tipe: string;
  merkID: number;
}