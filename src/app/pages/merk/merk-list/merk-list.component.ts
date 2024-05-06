import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { IMerk } from 'src/app/interfaces/i-merk';
import { IPaging } from 'src/app/interfaces/i-paging';
import { IResponse } from 'src/app/interfaces/i-response';
import { Paging } from 'src/app/models/paging';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MerkService } from 'src/app/services/merk.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merk-list',
  templateUrl: './merk-list.component.html',
  styleUrls: ['./merk-list.component.css'],
})
export class MerkListComponent implements OnInit {
  merks: IPaging<IMerk> = new Paging<IMerk>();
  private loadingService = inject(LoadingService);
  private merkService = inject(MerkService);
  private dataService = inject(DataService);
  search: string = '';
  errorNotFound: boolean = false;
  nowPage: number = 0;

  limit: number = 10;

  ngOnInit(): void {
    this.onList(this.nowPage);
    console.log(this.merks.data.totalItems);

  }

  onList(page: number | null = null) {
    this.loadingService.start();
    this.merkService
      .all({ page: page, search: this.search, limit: this.limit })
      .subscribe({
        next: (response: IPaging<IMerk>) => {
          this.errorNotFound = false;
          this.merks = response;
          this.nowPage = page || 0;
          this.dataService.updateTotalItems(response.data.totalItems);
          this.dataService.updateTotalPages(response.data.totalPages);
          console.log(response.data.totalPages);
          this.loadingService.stop();
        },
        error: (err: HttpErrorResponse) => {
          // console.error('Error:', err.error.error.message);

          if (err.error.error.message == 'Data Tidak Ditemukan') {
            this.errorNotFound = true;
            console.log(this.errorNotFound);
          }
        },
      });
  }

  onSuccessEditMerk(merk: IMerk | IResponse) {
    this.onList(this.nowPage);
  }

  onSuccessCreateMerk(merk: IMerk | IResponse) {
    this.onList(this.nowPage);
  }

  onPaginate(page: number | null) {
    this.onList(page);
  }
  

  resetSearch() {}

  onSearchChange() {
    if (this.search == '') {
      this.onList();
    }
  }

  doHapus(merknya: String, codeDealernya: String, idnya: number) {
    this.loadingService.start();
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: `Semua mobil dengan merk ${codeDealernya} - ${merknya} ini akan terhapus!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batalkan'
    }).then((result) => {
      if (result.isConfirmed) {
        this.merkService.deleteMerk(idnya).subscribe({
          next: (response:IResponse) => {
            Swal.fire({
              title: 'Berhasil!',
              text: `Merk ${codeDealernya} - ${merknya}`,
              icon: 'success',
            });
            this.onList(this.nowPage);
          },
          error: (err: HttpErrorResponse) => {
            console.log(this.errorNotFound);
            Swal.fire({
              title: 'Gagal!',
              text: 'Data gagal dihapus',
              icon: 'error',
            });
          },
        });
        
      }
    });
  }
}
