import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { IConsumer } from 'src/app/interfaces/i-consumer';
import { IPaging } from 'src/app/interfaces/i-paging';
import { IResponse } from 'src/app/interfaces/i-response';
import { Paging } from 'src/app/models/paging';
import { ConsumerService } from 'src/app/services/consumer.service';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consumer-testdrive-list',
  templateUrl: './consumer-testdrive-list.component.html',
  styleUrls: ['./consumer-testdrive-list.component.css'],
})
export class ConsumerTestdriveListComponent {
  consumers: IPaging<IConsumer> = new Paging<IConsumer>();
  limit: number = 10;
  search: string = '';
  errorNotFound: boolean = false;

  private consumerService = inject(ConsumerService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.onList();
  }

  onList(page: number | null = null) {
    this.loadingService.start();
    this.consumerService
      .all({
        page,
        search: this.search,
        limit: this.limit,
        isTestDrive: 'testdrive',
        isAll:'createdDate'
      })
      .subscribe({
        next: (response: IPaging<IConsumer>) => {
          this.errorNotFound = false;
          this.consumers = response;
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

  onSuccessCreateCustomer(customer: IResponse) {
    this.onList();
  }

  doSuccessTestDrive(antrianID: number) {
    this.consumerService
      .doEndTestDrive(antrianID).subscribe((response: IResponse) => {
      Swal.fire({
        title: 'Berhasil!',
        text: `Nasabah '${response.data.consumerName}' telah selesai test drive menggunakan mobil '${response.data.carID.merkID.merk}'`,
        icon: 'success',
      });
        this.onList();
    })
  }
  
  onSearchChange() {
    if (this.search == '') {
      this.onList();
    }
  }
}
