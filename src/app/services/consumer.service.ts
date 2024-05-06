import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { Observable, catchError, throwError } from 'rxjs';
import { IPaging } from '../interfaces/i-paging';
import { IConsumer, IConsumerRequest } from '../interfaces/i-consumer';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../interfaces/i-response';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  constructor() {}

  private httpClient = inject(HttpClient);
  private userService = inject(UserService);

  all(params: any = {}): Observable<IPaging<IConsumer>> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };
    if (params.page == null) {
      params.page = 0;
    }
    if (params.search == '') {
      console.log(params);
      return this.httpClient.get<IPaging<IConsumer>>(
        `${environment.baseUrl}/api/consumer/${params.isTestDrive}/${params.page}/desc/createdAt?filter-by=${params.isAll}&size=10&value=`,
        { headers }
      );
    } else {
      return this.httpClient.get<IPaging<IConsumer>>(
        `${environment.baseUrl}/api/consumer/${params.isTestDrive}/${params.page}/desc/createdAt?filter-by=consumerName&size=10&value=${params.search}`,
        { headers }
      );
    }
  }

  create(consumer: IConsumerRequest): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };

    return this.httpClient.post<IResponse>(
      `${environment.baseUrl}/api/consumer/register`,
      JSON.stringify(consumer),
      { headers }
    );
  }

  doCheckIn(kodeAntrian: String): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.httpClient.get<IResponse>(
      `${environment.baseUrl}/api/consumer/in/${kodeAntrian}`,
      { headers }
    );
  }

  hitTestDrive(kodeAntrian: String): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.httpClient.put<IResponse>(
      `${environment.baseUrl}/api/consumer/do/testdrive/${kodeAntrian}`,
      { headers }
    );
  }

  doEndTestDrive(idTestDrive: number): Observable<IResponse> {
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer ' + this.userService.getToken(),
    // };

    // console.log(headers);
    // return this.httpClient.put<IResponse>(
    //   `${environment.baseUrl}/api/consumer/end/testdrive/${idTestDrive}`,
    //   { headers }
    // );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };

    return this.httpClient.put<IResponse>(
      `${environment.baseUrl}/api/consumer/end/testdrive/${idTestDrive}`,
      null,
      { headers }
    );
  }

  getThisQR(thisConsumerId: number): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };

    return this.httpClient.get<IResponse>(
      `${environment.baseUrl}/api/consumer/getqr/${thisConsumerId}`,
      { headers }
    );
  }

  deleteThis(thisConsumerId: number): Observable<IResponse> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.userService.getToken(),
    };
    return this.httpClient.delete<IResponse>(
      `${environment.baseUrl}/api/consumer/${thisConsumerId}`,
      { headers }
    );
  }
}
