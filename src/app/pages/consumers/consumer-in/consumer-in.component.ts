import { HttpErrorResponse } from '@angular/common/http';
import { OnDestroy, inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { IConsumer } from 'src/app/interfaces/i-consumer';
import { IResponse } from 'src/app/interfaces/i-response';
import { Consumer } from 'src/app/models/consumer';
import { ConsumerService } from 'src/app/services/consumer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consumer-in',
  templateUrl: './consumer-in.component.html',
  styleUrls: ['./consumer-in.component.css'],
})
export class ConsumerInComponent implements OnInit, OnDestroy {
  id: string = '';
  totalAntrian: number = 0;
  nomorAntrian: number = 0;
  consumer: IConsumer = new Consumer();
  ticketStatus: number = 1; //1 : Antri , 2: Sedang Test Drive, 3: Selesai Test Drive
  private consumerService = inject(ConsumerService);
  private route = inject(ActivatedRoute);
  private intervalId: any;

  ngOnDestroy(): void {
    this.ticketStatus = 1;
  }

  ngOnInit() {
    this.ticketStatus = 1;
    this.route.params.subscribe((params) => {
      if (params instanceof NavigationEnd) {
        this.ticketStatus = 1;
      }
      this.id = params['id'];
      console.log('ID:', this.id);
    });

    // Call makeRequest initially
    this.makeRequest();

    // setInterval(() => {
    //   this.consumerService.doCheckIn(this.id).subscribe((res: IResponse) => {
    //     console.log(res);
    //     if (res.message == 'Sedang Test Drive') {
    //       this.ticketStatus = 2;
    //     }
    //     this.totalAntrian = res.data.total_antrian;
    //     this.nomorAntrian = res.data.nomor_antrian;
    //     this.consumer = res.data.yourTicket;
    //   });
    // }, 2000);
  }

  makeRequest() {
    this.consumerService.doCheckIn(this.id).subscribe({
      next: (res: IResponse) => {
        console.log(res);

        console.log(this.ticketStatus);

        if (res.message == 'Berhasil Masuk Antrian') {
          this.ticketStatus = 1;
        }

        if (res.message == 'Selesai Test Drive') {
          this.ticketStatus = 3;
          console.log(this.ticketStatus);
          clearInterval(this.intervalId);
        }

        if (res.message == 'Sedang Test Drive') {
          this.ticketStatus = 2;
          console.log(this.ticketStatus);
          // clearInterval(this.intervalId); // Stop further requests
          this.intervalId = setTimeout(() => this.makeRequest(), 1000);
        }
        this.totalAntrian = res.data.total_antrian;
        this.nomorAntrian = res.data.nomor_antrian;
        this.consumer = res.data.yourTicket;

        // If not 'Sedang Test Drive', set timeout for next request
        if (res.message !== 'Sedang Test Drive') {
          this.intervalId = setTimeout(() => this.makeRequest(), 1000);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.ticketStatus = 0;
      }
    });
  }

  doTestDrive() {
    console.log('btn hit');
    this.consumerService.hitTestDrive(this.id).subscribe((res: IResponse) => {
      console.log(res);
      if (res.message == 'Mobil Sedang Digunakan') {
        Swal.fire({
          title: 'Maaf!',
          text: `Mobil ${res.data[0].carID.merkID.merk} ${res.data[0].carID.tipe} sedang digunakan.`,
          icon: 'warning',
        });
      }
      this.makeRequest();

    });
  }
}


