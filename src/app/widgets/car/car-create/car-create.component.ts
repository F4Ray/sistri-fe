import { Component, EventEmitter, Output, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICarRequest } from 'src/app/interfaces/i-car';
import { IMerk } from 'src/app/interfaces/i-merk';
import { IPaging } from 'src/app/interfaces/i-paging';
import { IResponse } from 'src/app/interfaces/i-response';
import { CarRequest } from 'src/app/models/car';
import { Merk } from 'src/app/models/merk';
import { Paging } from 'src/app/models/paging';
import { CarService } from 'src/app/services/car.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MerkService } from 'src/app/services/merk.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css'],
})
export class CarCreateComponent {
  private modalService = inject(NgbModal);
  private loadingService = inject(LoadingService);
  private carService = inject(CarService);
  private merkService = inject(MerkService);
  carRequest: ICarRequest = new CarRequest();
  limit: number = 100;
  merk: IPaging<IMerk> = new Paging<IMerk>();
  search: string = '';
  carSelected: number | null = null;


  @Output() onSuccess: EventEmitter<IResponse> = new EventEmitter();

  open(content: TemplateRef<any>, page: number | null = null) {
    this.loadingService.start();
    this.modalService.open(content);
    this.merkService
      .all({ page, limit: this.limit, search:this.search})
      .subscribe((response: IPaging<IMerk>) => {
        this.merk = response;
        console.log(this.merk);
        console.log(this.carRequest);
        this.loadingService.stop();
      });
  }

  onCreate() {
    this.loadingService.start();

    this.carService.create(this.carRequest).subscribe((response: IResponse) => {
      this.onSuccess.emit(response);
      this.doreset();
      // Display SweetAlert2 modal with QR code
      Swal.fire({
        title: 'Berhasil!',
        text: `Data '${response.data}' berhasil ditambahkan.`,
        icon: 'success',
      }).then(() => {
        this.doreset();
        // this.router.navigate(['/main/barang'])
        // this.onSuccess.emit(response);
      });
    });
  }

  doreset() {
    this.carRequest = new CarRequest();
    this.carSelected = null;
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.merk.toLowerCase().includes(term) ||
      item.dealerCode.toLowerCase().includes(term)
    );
  }

  onSelectionChange(selectedItem: any) {
    this.carRequest.merkID = this.carSelected ? this.carSelected : 0;
    console.log('Selected item:', this.carRequest);
  }
}
