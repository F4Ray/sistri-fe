import { ICar } from "./i-car";

// Define the interface for TestDrive
export interface IConsumer {
  testDriveID: number;
  antrianID: string;
  consumerName: string;
  statusID: number;
  carID: ICar;
}

export interface IConsumerRequest {
  consumerName: string;
  carID: number;
}
