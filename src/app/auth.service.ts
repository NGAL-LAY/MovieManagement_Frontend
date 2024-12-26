import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;

  constructor(
    private router: Router
  ) { }

  login(username: string, password: string): boolean {
    username = "admin123";
    password = "12345678";
    if (username === 'admin123' && password === '12345678') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}