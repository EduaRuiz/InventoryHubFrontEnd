import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSource = new BehaviorSubject<boolean>(
    localStorage.getItem('token') ? true : false
  );
  loggedIn$ = this.loggedInSource.asObservable();

  login() {
    this.loggedInSource.next(true);
  }

  logout() {
    this.loggedInSource.next(false);
  }

  get isLoggedIn() {
    return this.loggedIn$;
  }
}
