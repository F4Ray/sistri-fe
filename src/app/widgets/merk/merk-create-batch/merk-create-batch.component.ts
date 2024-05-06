import { Component, ElementRef, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { MerkService } from 'src/app/services/merk.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-merk-create-batch',
  templateUrl: './merk-create-batch.component.html',
  styleUrls: ['./merk-create-batch.component.css'],
})
export class MerkCreateBatchComponent {
  private modalService = inject(NgbModal);
  private loadingService = inject(LoadingService);
  private merkService = inject(MerkService);
  @ViewChild('fileInput') fileInput!: ElementRef;

  open(content: TemplateRef<any>, page: number | null = null) {
    this.loadingService.start();
    this.modalService.open(content);
  }

  onCreate(ev: any) {
    
    let workBook: any = null;
    let jsonData: any = null;
    const reader = new FileReader();
    const file = ev[0];
    // const file = this.fileInput.nativeElement.files[0];
    console.log('Selected file:', file);
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(jsonData);
      console.log(dataString);
    };
    reader.readAsBinaryString(file);
  }

  doReset() {}
}
