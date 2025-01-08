import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './_services/users.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;
  strUserName: string = "";
  users: any = [];

  constructor(
    private router: Router,
    private userService: UsersService
  ) { }

  // fetch all users
  async getAllUsers(): Promise<void> {
    try {
      this.users = await firstValueFrom(this.userService.getAllUsers());
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    if (await this.getUserName(email,password)) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // fetch user name by email and password
  async getUserName(email: string, password: string){
    await this.getAllUsers();
    this.strUserName = this.users.find((user:any) => 
      user.email === email && user.password === password)?.name;
    return this.strUserName;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}