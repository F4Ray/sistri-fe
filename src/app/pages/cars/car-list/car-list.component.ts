import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ICar } from 'src/app/interfaces/i-car';
import { IPaging } from 'src/app/interfaces/i-paging';
import { IResponse } from 'src/app/interfaces/i-response';
import { Paging } from 'src/app/models/paging';
import { CarService } from 'src/app/services/car.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: IPaging<ICar> = new Paging<ICar>();
  errorNotFound: boolean = false;
  search: string = '';
  private loadingService = inject(LoadingService);
  private carService = inject(CarService);
  private router = inject(Router);
  private userService = inject(UserService);
  limit: number = 10;
  nowPage: number = 0;

  ngOnInit(): void {
    this.onList();
  }
  onList(page: number | null = null) {
    this.loadingService.start();
    this.carService
      .all({ page, search: this.search, limit: this.limit })
      .subscribe({
        next: (response: IPaging<ICar>) => {
          this.errorNotFound = false;
          this.cars = response;
          this.nowPage = page || 0;
          console.log(this.cars.data.content);
          this.loadingService.stop();
        },
        error: (err: HttpErrorResponse) => {
          if (
            err.error.error.error ==
            'Full authentication is required to access this resource'
          ) {
            this.router.navigate(['login']);
          }
          // console.error('Error:', err.error.error.message);

          if (err.error.error.message == 'Data Tidak Ditemukan') {
            this.errorNotFound = true;
            console.log(this.errorNotFound);
          }
        },
      });
  }

  onSearchChange() {
    if (this.search == '') {
      this.onList();
    }
  }

  onSuccessCreateCar(car: ICar | IResponse) {
    this.onList();
  }
  onSuccessEditMerk(car: ICar | IResponse) {}

  onPaginate(page: number | null) {
    this.onList(page);
  }

  doHapus(merknya: String, tipenya: String, idnya: number) {
    this.loadingService.start();
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: `mobil ${merknya} - ${tipenya} ini terhapus!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batalkan',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.deleteCar(idnya).subscribe({
          next: (response: IResponse) => {
            Swal.fire({
              title: 'Berhasil!',
              text: `Merk ${merknya} - ${tipenya}`,
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
