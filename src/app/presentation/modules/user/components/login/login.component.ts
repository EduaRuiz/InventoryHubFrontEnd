import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginResponse } from '@domain/models';
import { UserRepository } from '@domain/repository';
import { AuthService } from '@presentation/shared/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { UserUseCaseProviders } from 'data/factory';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  factoryUser = UserUseCaseProviders;
  loginForm!: FormGroup;
  email: string = '';
  password: string = '';
  type: string = 'password';
  state: boolean = false;
  eye: string = 'https://i.imgur.com/d1M6y1W.jpg';
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly userRepository: UserRepository,
    private readonly notifier: NotifierService,
    private authService: AuthService
  ) {
    this.notifier = notifier;
    this.loginForm = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]],
    });
  }

  onSubmit(): void {
    const data = <{ email: string; password: string }>this.loginForm.value;
    this.email = data.email;
    this.password = data.password;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    this.factoryUser.login
      .useFactory(this.userRepository)
      .execute(this.email, this.password)
      .subscribe({
        next: (response) => this.handlerSuccess(response, this.email),
        error: (err: Error) => {
          this.handlerError(err);
        },
      });
  }

  handlerValidators(param: 'email' | 'password'): string {
    return this.loginForm.controls[param].errors &&
      this.loginForm.controls[param].touched
      ? 'is-invalid'
      : '';
  }

  handlerMessage(param: 'email' | 'password'): string {
    const messages = {
      pattern: `Please provide a valid ${param}`,
      required: `Enter ${param} here`,
      minlength: ` chars minimum`,
      maxlength: ` chars maximum`,
    };
    let message = '';
    const errorValue = Object.values(
      this.loginForm.controls[param].errors ?? {}
    )[0];
    const errorKey = Object.keys(
      this.loginForm.controls[param].errors ?? {}
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

  handlerSuccess(response: ILoginResponse, email: string): void {
    this.loginForm.reset();
    this.notifier.notify('success', 'Bienvenido');
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.token);
      localStorage.setItem('branchId', response.data.branchId);
      localStorage.setItem('email', email);
      this.authService.login();
      this.router.navigate(['/home']);
    }, 1000);
  }

  handlerError(err: any): void {
    console.log(err);
    this.notifier.notify('error', 'Error al iniciar sesión' + err);
  }
}
