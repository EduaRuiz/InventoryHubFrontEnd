import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@domain/common';
import { IBranchModel, IUserModel, IUserRegisterForm } from '@domain/models';
import { BranchRepository, UserRepository } from '@domain/repository';
import { NotifierService } from 'angular-notifier';
import { UserUseCaseProviders } from 'data/factory';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  factoryUser = UserUseCaseProviders;
  registerForm!: FormGroup;
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  role: string = '';
  branch: string = '';
  branchesList: IBranchModel[] = [];
  rolesList: string[] = ['admin', 'employee'];
  type: string = 'password';
  state: boolean = false;
  eye: string = 'https://i.imgur.com/d1M6y1W.jpg';
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userRepository: UserRepository,
    private readonly notifier: NotifierService,
    private readonly branchRepository: BranchRepository
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: [
        this.firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        this.lastName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [
        this.email,
        [Validators.required, Validators.pattern(EMAIL_REGEX)],
      ],
      password: [
        this.password,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(PASSWORD_REGEX),
        ],
      ],
      role: [this.role, [Validators.required]],
      branch: [this.branch, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.branchRepository.getAllBranch().subscribe((data) => {
      this.branchesList = data;
    });
  }

  onSubmit(): void {
    const data = <IUserRegisterForm>this.registerForm.value;
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.branch = data.branch;
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;
    this.factoryUser.createUser
      .useFactory(this.userRepository)
      .execute({
        email: this.email,
        password: this.password,
        fullName: {
          firstName: this.firstName,
          lastName: this.lastName,
        },
        role: this.role,
        branchId: this.branch,
      })
      .subscribe({
        next: (response: IUserModel) => this.handlerSuccess(response),
        error: (err) => this.handlerError(err),
      });
  }

  handlerValidators(
    param: 'email' | 'password' | 'firstName' | 'lastName' | 'role' | 'branch'
  ): string {
    return this.registerForm.controls[param].errors &&
      this.registerForm.controls[param].touched
      ? 'is-invalid'
      : '';
  }

  handlerMessage(
    param: 'email' | 'password' | 'firstName' | 'lastName' | 'role' | 'branch'
  ): string {
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
  toggle(): void {
    if (this.state) {
      this.type = 'password';
      this.eye = 'https://i.imgur.com/d1M6y1W.jpg';
      this.state = !this.state;
    } else {
      this.type = 'text';
      this.eye = 'https://i.imgur.com/i8SxZqd.jpg';
      this.state = !this.state;
    }
  }

  handlerSuccess(response: IUserModel): void {
    this.registerForm.reset();
    this.notifier.notify('success', 'Usuario creado con éxito');
  }

  handlerError(err: HttpErrorResponse): void {
    console.log(err);
    this.notifier.notify('error', 'Error al registrar usuario');
  }
}
