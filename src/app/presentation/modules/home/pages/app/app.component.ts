import { Component, OnInit } from '@angular/core';
import { AuthService } from '@presentation/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}
  loggedIn = false;
  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('token') ? true : false;
    this.authService.isLoggedIn.subscribe((res) => {
      this.loggedIn = res;
    });
  }

  receiveMessage(message: boolean) {
    this.loggedIn = message;
  }
}
