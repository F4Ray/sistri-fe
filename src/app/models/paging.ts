import { IPaging } from '../interfaces/i-paging';

export class Paging<T> implements IPaging<T> {
  data: {
    totalItems: number;
    numberOfElements: number;
    totalPages: number;
    'filter-by': string;
    sort: string;
    'component-filter': any[];
    value: string;
    content: T[];
  };
  success: boolean;
  message: string;
  status: number;
  timestamp: number;

  constructor() {
    this.data =  {
      totalItems: 0,
      numberOfElements: 0,
      totalPages: 0,
      'filter-by': '',
      sort: '',
      'component-filter': [],
      value: '',
      content: [],
    };
    this.success = false;
    this.message = '';
    this.status = 0;
    this.timestamp = 0;
  }
}
