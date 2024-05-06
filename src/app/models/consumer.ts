import { ICar } from "../interfaces/i-car";
import { IConsumer, IConsumerRequest } from "../interfaces/i-consumer";

export class Consumer implements IConsumer {
  testDriveID: number;
  antrianID: string;
  consumerName: string;
  statusID: number;
  carID: ICar;

  constructor() {
    this.testDriveID = 0;
    this.antrianID = '';
    this.consumerName = '';
    this.statusID = 0;
    this.carID = {
      carID: 0,
      merkID: {
        merkID: 0,
        merk: "",    
        dealerCode: "",
      },
      tipe: "",
      createdBy: 0,
      createdAt: 0,
      updatedBy: 0,
      updatedAt: 0,
    };
  }
}

export class ConsumerRequest implements IConsumerRequest {
  consumerName: string;
  carID: number;

  constructor() {
    this.consumerName = "";
    this.carID = 0;
  }
  
}