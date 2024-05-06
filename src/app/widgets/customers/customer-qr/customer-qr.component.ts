import { Component, Inject, Input, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IResponse } from 'src/app/interfaces/i-response';
import { CarService } from 'src/app/services/car.service';
import { ConsumerService } from 'src/app/services/consumer.service';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment.development';
import * as QRCode from 'qrcode'; 

@Component({
  selector: 'app-customer-qr',
  templateUrl: './customer-qr.component.html',
  styleUrls: ['./customer-qr.component.css'],
})
export class CustomerQrComponent {
  @Input() id: number = 0;
  private loadingService = inject(LoadingService);
  private consumerService = inject(ConsumerService);
  private modalService = inject(NgbModal);

  linknya: string = '';
  qrnya: string = '';

  constructor() {}
  open(content: TemplateRef<any>, page: number | null = null) {
    this.loadingService.start();
    this.consumerService.getThisQR(this.id).subscribe((response: IResponse) => {
      this.linknya = `${environment.qrbaseUrl}/#/api/consumer/in/${response.data}`;
      console.log(response.data);
      QRCode.toDataURL(this.linknya, (err, qrCodeUrl) => {
        if (err) {
          console.error('Failed to generate QR code:', err);
          return;
        }
        this.qrnya = qrCodeUrl;
      });
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

  copyToClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(this.linknya)
        .then(() => console.log('Value copied to clipboard'))
        .catch((err) =>
          console.error('Failed to copy value to clipboard', err)
        );
    } else {
      console.error('Clipboard API not available');
    }
  }
}
