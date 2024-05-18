import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  expanded: boolean = true;
  role: string = '';
  constructor() {}
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    if (user) {
      this.role = user.role;
    }
  }

  toggleSidebar() {
    this.expanded = !this.expanded;
  }
}
