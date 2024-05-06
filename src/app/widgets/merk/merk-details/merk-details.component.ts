import { Component, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMerk } from 'src/app/interfaces/i-merk';
import { IResponse } from 'src/app/interfaces/i-response';
import { Merk } from 'src/app/models/merk';
import { MerkService } from 'src/app/services/merk.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merk-details',
  templateUrl: './merk-details.component.html',
  styleUrls: ['./merk-details.component.css'],
})
export class MerkDetailsComponent {
  @Input() id: number = 0;
  merk: IMerk = new Merk();
  private modalService = inject(NgbModal);
  private merkService = inject(MerkService);
  @Output() onSuccess: EventEmitter<IMerk | IResponse> = new EventEmitter();

  onDetail() {
    this.merkService.get(this.id).subscribe((response: IMerk | any) => {
      this.merk = response.data;
      console.log(this.merk);
    });
  }

  open(content: TemplateRef<any>) {
    this.onDetail();
    this.modalService.open(content);
  }

  onUpdate() {
    this.merkService
      .update(this.id, this.merk)
      .subscribe((response: IResponse) => {
        Swal.fire({
          title: 'Berhasil!',
          text: `Data Dealer '${this.merk.merk}' berhasil diubah`,
          icon: 'success',
        }).then(() => {
          // this.router.navigate(['/main/barang'])
          this.onSuccess.emit(response);
        });
      });
  }
}

