import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../../_shared/datepicker/datepicker.component';
import { Router, RouterLink } from '@angular/router';
import { Movie, MovieService } from '../../../_services/movie.service';
import { ConstantService } from '../../../_shared/constant/constant.service';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    DatepickerComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  // movie details from parent movie
  @Input() movieDetails: any;
  movieForm!: FormGroup;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private constantService: ConstantService
  ){}

  ngOnInit(): void {
    this.movieForm = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]),
      type: new FormControl('',[
        Validators.required
      ]),
      date: new FormControl('' ,[
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2}$/) // YYYY-MM-DD format
      ])
    });

    // Dynamically set values
  if (this.movieDetails) {
    this.movieForm.patchValue({
      name: this.movieDetails.name,
      type: this.movieDetails.type,
      date: this.movieDetails.year
    });
  }
  }

  

// This method will be called when the date changes
onDateChange(date: any) {
  console.log('Date selected:', date);
  // You can update the form control value here if necessary
  this.movieForm.patchValue({ date: date });
}

  /*
    new movie register  
  */
  onRegister(){
      const movie: Movie = {
        name: this.movieForm.value.name || '',  
        type: this.movieForm.value.type || '', 
        year: this.movieForm.value.date || '',  
      };
      
      this.movieService.registerMovie(movie).subscribe(
        (response) => {
          this.constantService.setObject(movie);
          this.router.navigate(['/movies']);
        }
      );
  }
}
