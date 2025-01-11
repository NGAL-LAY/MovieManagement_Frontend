import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User, UsersService } from '../../../_services/users.service';
import { CommonModule } from '@angular/common';
import { ConstantService } from '../../../_shared/constant/constant.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  // director details from parent director
  @Input() userDetails: any;
  username: string = '';
  password: string = '';
  userForm!: FormGroup;
  // edit status
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private userService: UsersService,
    private constantService: ConstantService
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
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

    // user details set by shared service
    this.constantService.currentData.subscribe((users) => {
      this.userDetails = users;
      // Dynamically set values
      if (this.userDetails) {
        this.isEdit = true;
        this.userForm.patchValue({
          name: this.userDetails.name,
          password: this.userDetails.password,
          repassword: this.userDetails.password,
          email: this.userDetails.email,
          nationality: this.userDetails.nationality,
          age: this.userDetails.age,
          gentle: this.userDetails.gentle,
        });
      }
    });
  }

  /**
    * new user registration
    */
  onRegUser(): void {
    const userData: User = {
      name: this.userForm.value.name || '',
      password: this.userForm.value.password || '',
      email: this.userForm.value.email || '',
      nationality: this.userForm.value.nationality || '',
      age: this.userForm.value.age || '',
      gentle: this.userForm.value.gentle || '',
      role: "admin"
    };

    this.userService.registerUser(userData).subscribe(
      (response) => {
        this.router.navigate(['/users']);
      }, (error) => {
        this.router.navigate(['/404'])
      }
    );
  }

  /*
     *user update  
     */
  onUpdate() {
    const userData: User = {
      name: this.userForm.value.name || '',
      password: this.userForm.value.password || '',
      email: this.userForm.value.email || '',
      nationality: this.userForm.value.nationality || '',
      age: this.userForm.value.age || '',
      gentle: this.userForm.value.gentle || '',
      role: "admin"
    };

    this.userService.updateUser(this.userDetails.id, userData).subscribe(
      (response) => {
        this.router.navigate(['/users']);
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
