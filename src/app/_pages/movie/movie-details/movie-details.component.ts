import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../../_shared/datepicker/datepicker.component';
import { RouterLink } from '@angular/router';
import { Movie, MovieService } from '../../../_services/movie.service';


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
export class MovieDetailsComponent {

  constructor(
    private movieService: MovieService,
  ){}

  movieForm = new FormGroup({
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
        date: this.movieForm.value.date || '',  
      };
      
      this.movieService.registerMovie(movie).subscribe(
        (response) => {
          console.log('Movie registered successfully', response);
        },
        (error) => {
          console.error('Error registering movie', error);
        }
      );
  }
}
