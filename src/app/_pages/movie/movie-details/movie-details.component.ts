import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../../_shared/datepicker/datepicker.component';
import { Router, RouterLink } from '@angular/router';
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
export class MovieDetailsComponent implements OnInit {
  // movie details from parent movie
  @Input() movieDetails: any;
  movieForm!: FormGroup;
  // edit status
  isEdit: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
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
      date: new FormControl('')
    });

    // Dynamically set values
  if (this.movieDetails.name) {
    this.isEdit = true;
    this.movieForm.patchValue({
      name: this.movieDetails.name,
      type: this.movieDetails.type,
      date: this.movieDetails.year
    });
  }
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
            localStorage.setItem('movie', JSON.stringify(response));
            this.router.navigate(['/movies']);
          }
        );
  }

  /*
    movie update  
  */
    onUpdate(){
      const movie: Movie = {
        name: this.movieForm.value.name || '',  
        type: this.movieForm.value.type || '', 
        year: this.movieForm.value.date || '',  
      };
      this.movieService.updateMovie(this.movieDetails.id,movie).subscribe(
        (response) => {
          localStorage.setItem('movie', JSON.stringify(response));
          this.router.navigate(['/movies']);
        }
      );
    }
}
