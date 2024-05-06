import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private totalItemsSource = new BehaviorSubject<number>(0);
   _totalItems$ = this.totalItemsSource.asObservable();
  private totalPagesSource = new BehaviorSubject<number>(0);
   _totalPages$ = this.totalPagesSource.asObservable();

  updateTotalItems(totalItems: number) {
    this.totalItemsSource.next(totalItems);
  }

  updateTotalPages(totalPages: number) {
    this.totalPagesSource.next(totalPages);
  }


  constructor() {}
}
