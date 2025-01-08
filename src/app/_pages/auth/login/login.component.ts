import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  async onLogin(): Promise<void> {
    const userEmail = this.loginForm.value.email;
    const userPassword = this.loginForm.value.password;
    if (await this.authService.login(userEmail,userPassword)) {
      const strUserName = await this.authService.getUserName(userEmail,userPassword);
      localStorage.setItem('accountName', JSON.stringify(strUserName));
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials. Please try again.');
        this.router.navigate(['/404'])
    }
  }
}