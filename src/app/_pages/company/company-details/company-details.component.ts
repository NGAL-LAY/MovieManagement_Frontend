import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DatepickerComponent } from '../../../_shared/datepicker/datepicker.component';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    DatepickerComponent
  ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent implements OnInit{
  
  // company details from parent company
  @Input() companyDetails: any;
  companyForm!: FormGroup;
  // edit status
  isEdit: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern(/^[A-Za-z][A-Za-z0-9\s]*$/)
      ]),
      release_movies: new FormControl('', [
        Validators.required
      ]),
      country: new FormControl('', [
        Validators.required
      ]),
      create_date: new FormControl('', [
        Validators.required
      ]),
    });

    // Dynamically set values
    if (this.companyDetails?.name) {
      this.isEdit = true;
      this.companyForm.patchValue({
        name: this.companyDetails.name,
        release_movies: this.companyDetails.release_movies,
        country: this.companyDetails.country,
        create_date: this.companyDetails.create_date
      });
    }
  }

  /*
      new company register  
    */
  onRegister() {
    // const movie: Movie = {
    //   name: this.movieForm.value.name || '',  
    //   type: this.movieForm.value.type || '', 
    //   year: this.movieForm.value.date || '',  
    // };
    //   this.movieService.registerMovie(movie).subscribe(
    //     (response) => {
    //       localStorage.setItem('movie', JSON.stringify(response));
    //       this.router.navigate(['/movies']);
    //     }
    //   );
  }

  /*
    company update  
  */
  onUpdate() {
    //   const movie: Movie = {
    //     name: this.movieForm.value.name || '',  
    //     type: this.movieForm.value.type || '', 
    //     year: this.movieForm.value.date || '',  
    //   };
    //   this.movieService.updateMovie(this.movieDetails.id,movie).subscribe(
    //     (response) => {
    //       localStorage.setItem('movie', JSON.stringify(response));
    //       this.router.navigate(['/movies']);
    //     }
    //   );
    }

}
