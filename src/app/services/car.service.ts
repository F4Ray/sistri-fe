import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { IPaging } from '../interfaces/i-paging';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../interfaces/i-response';
import { ICar, ICarRequest } from '../interfaces/i-car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  private httpClient = inject(HttpClient);
  private userService = inject(UserService);

  all(params: any = {}): Observable<IPaging<ICar>> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };

    if (params.page == null) {
      params.page = 0;
    }
    return this.httpClient.get<IPaging<ICar>>(
      `${environment.baseUrl}/api/car/${params.page}/asc/id?filter-by=tipe&size=10&value=${params.search}`,
      { headers }
    );
  }

  create(carRequest: ICarRequest): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };

    return this.httpClient.post<IResponse>(
      `${environment.baseUrl}/api/car/create/`,
      JSON.stringify(carRequest),
      { headers }
    );
  }

  deleteCar(id: number): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };
    return this.httpClient.delete<IResponse>(
      `${environment.baseUrl}/api/car/${id}`,
      { headers }
    );
  }
}
