import { AfterViewInit, Component, ElementRef, EventEmitter, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IConsumer, IConsumerRequest } from 'src/app/interfaces/i-consumer';
import { IPaging } from 'src/app/interfaces/i-paging';
import { IResponse } from 'src/app/interfaces/i-response';
import { ConsumerRequest } from 'src/app/models/consumer';
import { Paging } from 'src/app/models/paging';
import { CarService } from 'src/app/services/car.service';
import { ConsumerService } from 'src/app/services/consumer.service';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';
import * as QRCode from 'qrcode'; 
import { environment } from 'src/environments/environment.development';
import { ICar } from 'src/app/interfaces/i-car';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})
export class CustomerCreateComponent  {
  private modalService = inject(NgbModal);
  private loadingService = inject(LoadingService);
  private carService = inject(CarService);
  private consumerService = inject(ConsumerService);

  @ViewChild('namenya') namenya!: ElementRef;

  cars: IPaging<ICar> = new Paging<ICar>();
  limit: number = 100;
  consumerRequest: IConsumerRequest = new ConsumerRequest();
  @Output() onSuccess: EventEmitter<IResponse> = new EventEmitter();

  onSelectionChange(selectedItem: any) {
    console.log('Selected item:', this.consumerRequest);
  }



  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.tipe.toLowerCase().includes(term) ||
      item.merkID.merk.toLowerCase().includes(term)
    );
  }

  open(content: TemplateRef<any>, page: number | null = null) {
    this.loadingService.start();
    this.carService
      .all({ page, limit: this.limit, search:'' })
      .subscribe((response: IPaging<ICar>) => {
        this.cars = response;

        console.log(this.cars);
        this.loadingService.stop();
      });
    this.modalService.open(content).result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  onCreate() {
    this.consumerService
      .create(this.consumerRequest)
      .subscribe((response: IResponse) => {
        this.onSuccess.emit(response);
        this.reset();
        const url = `${environment.qrbaseUrl}/#/api/consumer/in/${response.data.kodeAntrian}`;
        QRCode.toDataURL(url, (err, qrCodeUrl) => {
          if (err) {
            console.error('Failed to generate QR code:', err);
            return;
          }
          // Display SweetAlert2 modal with QR code
          Swal.fire({
            title: 'Berhasil!',
            text: `Nasabah '${response.data.consumerName}' berhasil didaftarkan - ${url}`,
            imageUrl: qrCodeUrl,
            imageWidth: 400,
            imageHeight: 400,
            confirmButtonText: 'OK',
          });
        });
      });
  }

  reset() {
    this.consumerRequest = new ConsumerRequest();
  }
}
