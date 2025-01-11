import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User, UsersService } from '../../../_services/users.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  username: string = '';
  password: string = '';
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private userService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern(/^[A-Za-z][A-Za-z0-9\s]*$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        matchPasswordValidator('password'), // Custom validator
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
      ])
    });
  }

  /**
   * sign up form registration
   */
  async onSignUp(): Promise<void> {
    const userData: User = {
      name: this.signupForm.value.name || '',
      password: this.signupForm.value.password || '',
      email: this.signupForm.value.email || '',
      nationality: this.signupForm.value.nationality || '',
      age: this.signupForm.value.age || '',
      gentle: this.signupForm.value.gentle || '',
      role: "user"
    };

    this.userService.registerUser(userData).subscribe(
      async (response) => {
        if (await this.authService.login(response.email, response.password)) {
          const intUserId = this.userService.getUserId(response.email, response.password);
          localStorage.setItem('userId', JSON.stringify(intUserId));
          localStorage.setItem('accountName', JSON.stringify(response.name));
          localStorage.setItem('userRole', JSON.stringify(response.role));
          this.router.navigate(['/home']);
        }

      }, (error) => {
        this.router.navigate(['/404'])
      }
    );
  }
}

// password and repassword validation
export function matchPasswordValidator(passwordControlName: string): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null; // Return null if control is not part of a group yet.
    }

    const password = control.parent.get(passwordControlName)?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}