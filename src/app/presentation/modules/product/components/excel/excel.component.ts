import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductRepository } from '@domain/index';
import { IProductModel } from '@domain/models';
import { NotifierService } from 'angular-notifier';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css'],
})
export class ExcelComponent {
  @ViewChild('fileInput') fileInput?: ElementRef;
  selectedFileName: string | undefined;
  load = false;
  constructor(
    private readonly saver: FileSaverService,
    private readonly productRepository: ProductRepository<IProductModel>,
    private readonly notifier: NotifierService
  ) {
    this.notifier = notifier;
  }
  ExcelData?: {
    id: string;
    name: string;
    price: string;
    quantity: string;
    stockAdd: number;
  }[];
  activarInput() {
    this.fileInput?.nativeElement.click();
  }

  readExcel(event: any) {
    let file = event.target.files[0];
    this.selectedFileName = file.name;
    this.load = true;
    if (!file.name.endsWith('.xlsx')) {
      this.notifier.notify(
        'error',
        'El archivo debe ser de tipo excel (.xlsx)'
      );
      this.load = false;
      return;
    }
    let reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      const workBook = XLSX.read(reader.result, { type: 'binary' });
      const sheetName = workBook.SheetNames;
      const jsonSimple = XLSX.utils.sheet_to_json(
        workBook.Sheets[sheetName[0]]
      ) as {
        id: string;
        name: string;
        price: string;
        quantity: string;
        stockAdd: number;
      }[];
      this.ExcelData = jsonSimple as any;
    };
  }

  action() {
    const errors: any[] = [];
    this.ExcelData?.forEach((product) => {
      const productAux = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        stockAdd: product.stockAdd,
      };
      this.productRepository
        .registerQuantity(productAux.id, {
          quantity: productAux.stockAdd,
        })
        .subscribe({
          complete: () => {},
          error: (error) => {
            errors.push(error);
          },
        });
    });

    if (errors.length > 0) {
      this.notifier.notify(
        'error',
        'Ocurrio un error al registrar algunos productos'
      );
      return;
    } else {
      this.notifier.notify(
        'success',
        'Se registraron los productos correctamente'
      );
    }
  }

  downloadExcel() {
    const branchId = localStorage.getItem('branchId') || '';
    this.productRepository
      .getAllProduct(branchId)
      .subscribe((Json: IProductModel[]) => {
        const EXCEL_TYPE =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const jsonSimple = Json.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          stockAdd: 0,
        }));
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonSimple);
        const workbook: XLSX.WorkBook = {
          Sheets: { data: worksheet },
          SheetNames: ['data'],
        };

        const excelBuffer: any = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });

        const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
        this.saver.save(blobData, 'plantilla_tooltraxpro' + EXCEL_EXTENSION);
        this.notifier.notify('success', 'Se descargo el archivo correctamente');
      });
  }
}
