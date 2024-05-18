// Libraries
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//Services
import { UserRepository } from '@domain/repository';
import { UserUseCaseProviders } from 'data/factory';
import { Router } from '@angular/router';
import { IUserLoggedIn } from '@domain/models';

export const AuthGuardSuperAdmin = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const router = inject(Router);
  if (user != null && token != null) {
    const { userId, role } = JSON.parse(user) as IUserLoggedIn;
    const factoryUser = UserUseCaseProviders;
    const userRepository = inject(UserRepository);
    if (role !== 'superAdmin') {
      router.navigate(['/home']);
      return false;
    }
    factoryUser.refresh
      .useFactory(userRepository)
      .execute(token, userId)
      .subscribe({
        next: (response: { token: string }) => {
          localStorage.setItem('token', response.token);
        },
        error: (err) => {
          // localStorage.removeItem('token');
          // localStorage.removeItem('user');
          router.navigate(['/home']);
        },
      });
    return true;
  }
  // localStorage.removeItem('token');
  // localStorage.removeItem('user');
  router.navigate(['/home']);
  return false;
};

export const AuthGuardAdmin = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const router = inject(Router);
  if (user != null && token != null) {
    const { userId, role } = JSON.parse(user) as IUserLoggedIn;
    const factoryUser = UserUseCaseProviders;
    const userRepository = inject(UserRepository);
    if (role !== 'admin' && role !== 'superAdmin') {
      router.navigate(['/home']);
      return false;
    }
    factoryUser.refresh
      .useFactory(userRepository)
      .execute(token, userId)
      .subscribe({
        next: (response: { token: string }) => {
          localStorage.setItem('token', response.token);
        },
        error: (err) => {
          // localStorage.removeItem('token');
          // localStorage.removeItem('user');
          router.navigate(['/home']);
        },
      });
    return true;
  }
  // localStorage.removeItem('token');
  // localStorage.removeItem('user');
  router.navigate(['/home']);
  return false;
};

export const AuthGuardEmployee = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const router = inject(Router);
  if (user != null && token != null) {
    const { userId, role } = JSON.parse(user) as IUserLoggedIn;
    const factoryUser = UserUseCaseProviders;
    const userRepository = inject(UserRepository);
    if (role !== 'admin' && role !== 'superAdmin' && role !== 'employee') {
      router.navigate(['/home']);
      return false;
    }
    factoryUser.refresh
      .useFactory(userRepository)
      .execute(token, userId)
      .subscribe({
        next: (response: { token: string }) => {
          localStorage.setItem('token', response.token);
        },
        error: (err) => {
          // localStorage.removeItem('token');
          // localStorage.removeItem('user');
          router.navigate(['/home']);
        },
      });
    return true;
  }
  // localStorage.removeItem('token');
  // localStorage.removeItem('user');
  router.navigate(['/home']);
  return false;
};
