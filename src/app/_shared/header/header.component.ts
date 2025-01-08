import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  strAccountName: string = '';
  blnCollapse: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const accountName = localStorage.getItem('accountName');
      this.strAccountName = accountName ? JSON.parse(accountName) : '';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  CollapseOn() {
    this.blnCollapse = !this.blnCollapse;
  }
}
