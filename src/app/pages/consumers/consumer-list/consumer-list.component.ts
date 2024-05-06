import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { IConsumer } from 'src/app/interfaces/i-consumer';
import { IPaging } from 'src/app/interfaces/i-paging';
import { IResponse } from 'src/app/interfaces/i-response';
import { Paging } from 'src/app/models/paging';
import { ConsumerService } from 'src/app/services/consumer.service';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.css'],
})
export class ConsumerListComponent implements OnInit {
  consumers: IPaging<IConsumer> = new Paging<IConsumer>();
  limit: number = 10;
  search: string = '';
  errorNotFound: boolean = false;
  nowPage: number = 0;
  selectedOption: string = 'createdDate';
  isAll: boolean = false;
  paramSelected: string = '';

  private consumerService = inject(ConsumerService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.onList(this.nowPage);
  }

  onList(page: number | null = null) {
    this.loadingService.start();
    this.consumerService
      .all({
        page,
        search: this.search,
        limit: this.limit,
        isTestDrive: 'all',
        isAll: this.selectedOption,
      })
      .subscribe({
        next: (response: IPaging<IConsumer>) => {
          this.errorNotFound = false;
          this.consumers = response;
          this.nowPage = page || 0;
          console.log(this.consumers.data.content);
          this.loadingService.stop();
        },
        error: (err: HttpErrorResponse) => {
          // console.error('Error:', err.error.error.message);

          if (err.error.error.message == 'Data Tidak Ditemukan') {
            this.errorNotFound = true;
          }
        },
      });
    // .subscribe(
    //   (response: IPaging<IConsumer>) => {
    //     this.consumers = response;
    //     console.log(this.consumers.data.content);
    //     this.loadingService.stop();
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error('Error:', error.error.message);
    //     // Handle the error here, e.g., display an error message to the user
    //     this.loadingService.stop();
    //   }
    // );
  }

  updateIsAll() {
    this.isAll = this.selectedOption === 'all';
  }

  onSuccessCreateCustomer(customer: IResponse) {
    this.onList(this.nowPage);
  }
  onSearchChange() {
    if (this.search == '') {
      this.onList(this.nowPage);
    }
  }

  onPaginate(page: number | null) {
    this.onList(page);
  }

  doHapus(idnya: number, consumerName: string) {
    this.loadingService.start();
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: `${consumerName} akan dihapus dari daftar antrian`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batalkan',
    }).then((result) => {
      if (result.isConfirmed) {
        this.consumerService.deleteThis(idnya).subscribe({
          next: (response: IResponse) => {
            Swal.fire({
              title: 'Berhasil!',
              text: `${consumerName} dihapus dari antrian`,
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
