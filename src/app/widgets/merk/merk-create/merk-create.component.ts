import { Component, EventEmitter, Output, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMerkRequest } from 'src/app/interfaces/i-merk';
import { IResponse } from 'src/app/interfaces/i-response';
import { MerkRequest } from 'src/app/models/merk';
import { LoadingService } from 'src/app/services/loading.service';
import { MerkService } from 'src/app/services/merk.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merk-create',
  templateUrl: './merk-create.component.html',
  styleUrls: ['./merk-create.component.css'],
})
export class MerkCreateComponent {
  private modalService = inject(NgbModal);
  private loadingService = inject(LoadingService);
  private merkService = inject(MerkService);
  merkRequest: IMerkRequest = new MerkRequest();

  @Output() onSuccess: EventEmitter<IResponse> = new EventEmitter();

  open(content: TemplateRef<any>, page: number | null = null) {
    this.loadingService.start();
    this.modalService.open(content);
  }

  onCreate() {
    this.loadingService.start();

    this.merkService
      .create(this.merkRequest)
      .subscribe((response: IResponse) => {
        this.onSuccess.emit(response);
        this.doreset();
        const url = `${environment.qrbaseUrl}/#/api/consumer/in/${response.data.kodeAntrian}`;
          // Display SweetAlert2 modal with QR code
          Swal.fire({
            title: 'Berhasil!',
            text: `Data '${response.data.merk}' berhasil dibuat dengan kode dealer ${response.data.dealerCode}`,
            icon: 'success',
          }).then(() => {
            this.doreset();
            // this.router.navigate(['/main/barang'])
            // this.onSuccess.emit(response);
          })
        });
      };

  doreset() {
    this.merkRequest = new MerkRequest();
  }
}
