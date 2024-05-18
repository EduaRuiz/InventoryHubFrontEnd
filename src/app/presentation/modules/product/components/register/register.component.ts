import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryEnum } from '@domain/common/enums';
import { IProductModel, IProductRegisterForm } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { NotifierService } from 'angular-notifier';
import { ProductUseCaseProviders } from 'data/factory';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterProductComponent implements OnInit {
  factoryProduct = ProductUseCaseProviders;
  registerForm!: FormGroup;
  name: string = '';
  description: string = '';
  price: number = 0;
  category: string = '';
  state: boolean = false;
  branchId: string = '';
  productCategories: string[] = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notifier: NotifierService,
    private readonly productRepository: ProductRepository<IProductModel>
  ) {
    this.registerForm = this.formBuilder.group({
      name: [
        this.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      description: [
        this.description,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],
      ],
      price: [this.price, [Validators.required, Validators.min(1)]],
      category: [
        this.category,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.productCategories = Object.values(ProductCategoryEnum);
    this.branchId = localStorage.getItem('branchId') || '';
  }

  onSubmit(): void {
    const data = <IProductRegisterForm>this.registerForm.value;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.category = data.category;
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;
    this.factoryProduct.createProduct
      .useFactory(this.productRepository)
      .execute({
        name: this.name,
        description: this.description,
        price: this.price,
        quantity: 0,
        category: this.category,
        branchId: this.branchId,
      })
      .subscribe({
        next: (response: IProductModel) => this.handlerSuccess(response),
        error: (err) => this.handlerError(err),
      });
  }

  handlerValidators(
    param: 'name' | 'description' | 'price' | 'category'
  ): string {
    return this.registerForm.controls[param].errors &&
      this.registerForm.controls[param].touched
      ? 'is-invalid'
      : '';
  }

  handlerMessage(param: 'name' | 'description' | 'price' | 'category'): string {
    const messages = {
      pattern: `Please provide a valid ${param}`,
      required: `Enter ${param} here`,
      minlength: ` chars minimum`,
      maxlength: ` chars maximum`,
    };
    let message = '';
    const errorValue = Object.values(
      this.registerForm.controls[param].errors ?? {}
    )[0];
    const errorKey = Object.keys(
      this.registerForm.controls[param].errors ?? {}
    )[0];
    switch (errorKey) {
      case 'required':
        message = messages.required;
        break;
      case 'pattern':
        message = messages.pattern;
        break;
      case 'minlength':
        message = errorValue?.requiredLength + messages.minlength;
        break;
      case 'maxlength':
        message = errorValue?.requiredLength + messages.maxlength;
        break;
    }
    return message;
  }

  handlerSuccess(response: IProductModel): void {
    this.registerForm.reset();
    this.notifier.notify('success', 'Producto creado con éxito');
  }

  handlerError(err: HttpErrorResponse): void {
    console.log(err);
    this.notifier.notify(
      'error',
      'Error al registrar producto: ' + err.error.message ?? ''
    );
  }
}
