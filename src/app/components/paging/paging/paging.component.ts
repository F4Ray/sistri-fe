import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent implements OnInit{
  @Input() totalItems: any;
  @Input() totalPages: any;
  @Input() nowPage: any;

  haveNext: boolean = false;
  havePrev: boolean = false;
  @Output() onPaginate: EventEmitter<number> = new EventEmitter();

  btnClick: number = 0;

  constructor(private loadingService: LoadingService,private dataService : DataService) {
    
  }

  ngOnInit(): void {
    console.log(this.totalItems);
    console.log(this.totalPages);
    console.log(this.nowPage);
  }

  onPaginateAction(nextPage: number, whatButton: number) {
    this.btnClick = whatButton;
    this.onPaginate.emit(nextPage);
  }

  isLoading() {
    return this.loadingService.isLoading();
  }
}
