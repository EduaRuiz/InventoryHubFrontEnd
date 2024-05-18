import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  BranchRepository,
  ProductRepository,
  SaleRepository,
} from '@domain/index';
import { IProductModel } from '@domain/models';
import { InventorySocket } from '@presentation/shared';
import { NotifierService } from 'angular-notifier';
import { SaleUseCaseProviders } from 'data/factory';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css'],
})
export class GetAllProductsComponent implements OnInit {
  branchId: string = '';
  userId: string = '';
  products = this.socket.products;
  p: number = 1;
  size: number = 12;
  numbers: number[] = [];
  factorySale = SaleUseCaseProviders;
  cartClicked: boolean[] = [];
  saleClicked: boolean = false;
  empty: boolean = true;
  currentProduct: IProductModel[] = [];
  isActive: boolean = true;

  productsSale: {
    id: string;
    name: string;
    quantity: number;
    i: number;
  }[] = [];

  constructor(
    private readonly socket: InventorySocket,
    private readonly branchRepository: BranchRepository,
    private readonly saleRepository: SaleRepository,
    private readonly productRepository: ProductRepository<IProductModel>,
    private formBuilder: FormBuilder,
    private readonly notifier: NotifierService
  ) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.branchId = localStorage.getItem('branchId') ?? '';
    this.userId = JSON.parse(localStorage.getItem('user') ?? '').userId;
    this.socket.joinInventory(this.branchId);
    this.productRepository.getAllProduct(this.branchId).subscribe((data) => {
      this.socket.setProducts(data);
      if (data.length === 0) {
        this.empty = true;
      } else {
        this.empty = false;
      }
      this.socket.orderbyName();
    });
    this.products.subscribe((data) => {
      this.currentProduct = data;
      if (data.length > this.numbers.length) {
        const number = data.length - this.numbers.length;
        const auxNumbers: number[] = new Array(number).fill(0);
        this.numbers = [...this.numbers, ...auxNumbers];
        this.cartClicked = new Array(this.numbers.length).fill(false);
      }
    });
  }

  increment(index: number, id: string): void {
    const product = this.currentProduct.find((x) => x.id === id);
    if (product && product.quantity <= this.numbers[index]) {
      this.notifier.notify('error', 'No hay suficiente stock');
      return;
    }
    this.numbers[index] = this.numbers[index] + 1;
  }

  decrement(index: number): void {
    if (this.numbers[index] > 0) this.numbers[index] = this.numbers[index] - 1;
    else this.numbers[index] = 0;
  }

  validarNumero(id: string): boolean {
    const product = this.productsSale.find((x) => x.id === id);
    if (product) {
      if (product.quantity <= 0) {
        return true;
      }
    }
    return false;
  }

  getNumber(id: string): number {
    const product = this.productsSale.find((x) => x.id === id);
    return product?.quantity ? product.quantity : 0;
  }

  addToCart(id: string, index: number): void {
    let product = {} as IProductModel;
    this.products.subscribe((data) => {
      product = data[index];
    });
    if (this.numbers[index] <= 0) {
      this.notifier.notify('error', 'La cantidad debe ser mayor a 0');
      return;
    }
    if (this.cartClicked[index]) {
      this.cartClicked[index] = false;
      this.productsSale.splice(
        this.productsSale.findIndex((x) => x.id === id),
        1
      );
    } else {
      this.cartClicked[index] = true;
      this.productsSale.push({
        id: id,
        name: product?.name ? product.name : '',
        quantity: this.numbers[index],
        i: index,
      });
    }
  }

  closeCart() {
    const cartCollapse = document.getElementById('cartCollapse');
    if (cartCollapse) {
      cartCollapse.classList.remove('show');
    }
  }

  deleteItem(id: string): void {
    const product = this.productsSale.find((x) => x.id === id);
    const i = product?.i ? product.i : 0;
    console.log(i);
    this.numbers[i] = 0;
    this.productsSale.splice(
      this.productsSale.findIndex((x) => x.id === id),
      1
    );
    this.cartClicked[i] = false;
  }

  purchase(): void {
    this.factorySale.createSale
      .useFactory(this.saleRepository)
      .execute(
        {
          products: this.productsSale,
          branchId: this.branchId,
          userId: this.userId,
          email: localStorage.getItem('email') ?? '',
        },
        this.isActive ? 'customer-sale' : 'seller-sale'
      )
      .subscribe({
        complete: () => {
          this.saleClicked = true;

          setTimeout(() => {
            this.notifier.notify('success', 'Compra realizada con éxito');
            this.saleClicked = false;
            this.resetNumbers();
            this.productsSale = [];
          }, 3500);
        },
        error: (error) => {
          this.notifier.notify(
            'error',
            error.error.message ? error.error.message : error
          );
        },
      });
  }

  resetNumbers(): void {
    this.numbers = new Array(this.numbers.length).fill(0);
    this.cartClicked = new Array(this.numbers.length).fill(false);
  }

  pageChanged(event: any): void {
    this.resetNumbers();
    this.p = event;
    this.productsSale.forEach((product) => {
      this.numbers[product.i] = product.quantity;
      this.cartClicked[product.i] = true;
    });
  }

  toggleSlider(type: String) {
    if (type == 'customer') {
      this.isActive = true;
    } else if (type == 'seller') {
      this.isActive = false;
    }
  }

  mapCategoryToClass(category: string): string {
    switch (category) {
      case 'Herramientas de Mano':
        return 'herramientas-de-mano';
      case 'Herramientas Eléctricas':
        return 'herramientas-electricas';
      case 'Cerrajería':
        return 'cerrajeria';
      case 'Herrajes de Construcción':
        return 'herrajes-de-construccion';
      case 'Pintura y Accesorios':
        return 'pintura-y-accesorios';
      case 'Jardinería y Exteriores':
        return 'jardineria-y-exteriores';
      case 'Equipo de Seguridad y Protección':
        return 'equipo-de-seguridad-y-proteccion';
      case 'Suministros de Fontanería':
        return 'suministros-de-fontaneria';
      case 'Material Eléctrico':
        return 'material-electrico';
      case 'Accesorios para el Hogar':
        return 'accesorios-para-el-hogar';
      case 'Otros':
        return 'otros';
      default:
        return '';
    }
  }
}
