 export interface IPaging<T> {
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
}
