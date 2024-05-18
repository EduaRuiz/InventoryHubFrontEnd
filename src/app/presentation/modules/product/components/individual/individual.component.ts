import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductModel } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { NotifierService } from 'angular-notifier';
import { GetProductUseCaseFactory } from 'data/factory';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css'],
})
export class IndividualProductComponent implements OnInit {
  productId = this.route.snapshot.paramMap.get('id');
  product: IProductModel | undefined;
  factory = GetProductUseCaseFactory;
  quantityClicked: boolean = false;
  numbersStock: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly productRepository: ProductRepository<IProductModel>,
    private readonly notifier: NotifierService
  ) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.productRepository
      .getProductById(this.productId || '')
      .subscribe((data) => {
        this.product = data;
      });
  }

  addStock(): void {
    if (this.numbersStock <= 0) {
      this.notifier.notify('error', 'La cantidad debe ser mayor a 0');
      return;
    }
    this.productRepository
      .registerQuantity(this.productId || '', {
        quantity: this.numbersStock,
      })
      .subscribe({
        complete: () => {
          this.notifier.notify('success', 'Cantidad agregada con éxito');
          this.quantityClicked = true;
          this.numbersStock = 0;
          if (this.product && this.product?.quantity) {
            this.product.quantity = this.product.quantity + this.numbersStock;
          }
        },
        error: (error) => {
          this.notifier.notify(
            'error',
            error.error.message ? error.error.message : error
          );
        },
      });
  }

  increment(): void {
    this.numbersStock = this.numbersStock + 1;
  }

  decrement(): void {
    if (this.numbersStock - 1 > 0) this.numbersStock = this.numbersStock - 1;
    else this.numbersStock = 0;
  }

  validarNumero(): boolean {
    if (this.product && this.product?.quantity <= 0) {
      return true;
    }
    return false;
  }
}
