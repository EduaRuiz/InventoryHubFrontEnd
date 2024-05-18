import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BranchRepository,
  IBranchModel,
  IBranchRegisterForm,
} from '@domain/index';
import { NotifierService } from 'angular-notifier';
import { BranchUseCaseProviders } from 'data/factory';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  factoryBranch = BranchUseCaseProviders;
  registerForm!: FormGroup;
  name: string = '';
  city: string = '';
  country: string = '';
  state: boolean = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notifier: NotifierService,
    private readonly branchRepository: BranchRepository
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
      city: [
        this.city,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      country: [
        this.country,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    const data = <IBranchRegisterForm>this.registerForm.value;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;
    this.factoryBranch.createBranch
      .useFactory(this.branchRepository)
      .execute({
        name: this.name,
        location: {
          city: this.city,
          country: this.country,
        },
      })
      .subscribe({
        next: (response: IBranchModel) => this.handlerSuccess(response),
        error: (err) => this.handlerError(err),
      });
  }

  handlerValidators(param: 'name' | 'city' | 'country'): string {
    return this.registerForm.controls[param].errors &&
      this.registerForm.controls[param].touched
      ? 'is-invalid'
      : '';
  }

  handlerMessage(param: 'name' | 'city' | 'country'): string {
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

  handlerSuccess(response: IBranchModel): void {
    this.registerForm.reset();
    this.notifier.notify('success', 'Sede creada con éxito');
  }

  handlerError(err: HttpErrorResponse): void {
    console.log(err);
    this.notifier.notify(
      'error',
      'Error al registrar sede: ' + err.error.message ?? err.message
    );
  }
}
