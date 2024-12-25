import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  username: string = '';
  password: string = '';
  signupForm!: FormGroup;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
          name: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25),
            Validators.pattern(/^[A-Za-z][A-Za-z0-9\s]*$/)
          ]),
          email: new FormControl('', [
            Validators.required
          ]),
          nationality: new FormControl('', [
            Validators.required
          ]),
          age: new FormControl('', [
            Validators.required
          ]),
          gentle: new FormControl('m', [
            Validators.required
          ]),
          role: new FormControl('user', [
            Validators.required
          ]),
        });
  }
  onSubmit(): void {
    // if (this.authService.login(this.username, this.password)) {
    //   this.router.navigate(['/home']);
    // } else {
    //   alert('Invalid credentials. Please try again.');
    // }
  }
}
