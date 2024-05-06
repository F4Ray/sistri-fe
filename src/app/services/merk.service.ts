import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { IMerk, IMerkRequest } from '../interfaces/i-merk';
import { IPaging } from '../interfaces/i-paging';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../interfaces/i-response';

@Injectable({
  providedIn: 'root',
})
export class MerkService {
  constructor() {}

  private httpClient = inject(HttpClient);
  private userService = inject(UserService);

  create(merk: IMerkRequest): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };

    return this.httpClient.post<IResponse>(
      `${environment.baseUrl}/api/merk/create`,
      JSON.stringify(merk),
      { headers }
    );
  }

  all(params: any = {}): Observable<IPaging<IMerk>> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };
    if (params.page == null) {
      params.page = 0
    }
    return this.httpClient.get<IPaging<IMerk>>(
      `${environment.baseUrl}/api/merk/${params.page}/desc/createdAt?filter-by=merk&size=${params.limit}&value=${params.search}`,
      { headers, params }
    );
  }

  get(id: number): Observable<IMerk> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };

    return this.httpClient.get<IMerk>(`${environment.baseUrl}/api/merk/${id}`, {
      headers,
    });
  }

  update(id: number, customer: IMerk): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };

    return this.httpClient.put<IResponse>(
      `${environment.baseUrl}/api/merk/update/${id}`,
      JSON.stringify(customer),
      { headers }
    );
  }

  deleteMerk(id: number): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };
    return this.httpClient.delete<IResponse>(
      `${environment.baseUrl}/api/merk/${id}`,
      { headers }
    );
  }
}
