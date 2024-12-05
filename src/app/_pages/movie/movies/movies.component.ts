import { Component, Input } from '@angular/core';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../_shared/header/header.component';
import { FooterComponent } from '../../../_shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../_services/movie.service';
import { ConstantService } from '../../../_shared/constant/constant.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatepickerComponent } from '../../../_shared/datepicker/datepicker.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    MovieDetailsComponent,
    DatepickerComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  constructor(
    private movieService: MovieService,
    private constantService: ConstantService,
    private fb: FormBuilder,
    private router: Router
  )
  {
      //validdate movie
        this.movieForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(6)]],
          type: ['', Validators.required],
          date: ['',[Validators.required]]
        });
  }

  movies: any[] = [];
  movieForm: FormGroup;
  strMovieName: string = "";
  strMovieType: string = "";
  strMovieDate: string = "";
  blnPlay: Boolean = false;
  blnNewMovie: Boolean = false;
  strMovieAbout: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.';



  ngOnInit(): void {
    // Subscribe to the constantService
    this.constantService.currentMovieData.subscribe(data => {
      if (data) {
        // this.strMovieName = data.name;
        // this.strMovieType = data.type;
        this.setMovieName(data.name);
      }
    });

  }

  isMovieDetailsActive(): boolean {
    return this.router.url.includes('movie-details');
  }

  onClick(){
    this.blnPlay = true;
  }

  onDateChange(selectedDate: string) {
    this.movieForm.get('date')!.setValue(selectedDate);
  }

  //set existing movie name by using one way binding
  setMovieName(movieName : string){
    this.movieForm.get('name')!.setValue(movieName);
  }

  onNewMovie(){
    this.blnNewMovie = true;
    // console.log("i am movie components");
    // this.movieService.getMovies().subscribe(
    //   (data) => {
    //     this.movies = data; // Assign the received data to the movies property
    //     console.log(this.movies); // Log the movies to the console
    //   },
    //   (error) => {
    //     console.error('Error fetching movies', error); // Handle errors here
    //   })
  }

  /**
   * show movies
   */
  onEditMovie(){
    this.blnNewMovie = true;
    this.movieService.getAllMovies().subscribe(
      (movie)=>{
        this.movies = movie;
        // check movie array is null or empty
        if(this.movies.length > 0){
          this.strMovieName = this.movies[0].name;
          this.strMovieType = this.movies[0].type;
          
        }
      },
      (error)=>{
        console.error('Error fetching movies',error); // handle get movie error 
      }
    )
  }

  /**
   * new movie register 
   */
  onRegisterMovie(){
    const movieData = this.movieForm.value;
    this.movieService.registerMovie(movieData).subscribe(
      response=>{
        console.log('Movie registered successfully', response);
        this.movieForm.reset();
    },
      error=>{
        console.error('Movie Register Error',error);
      }
  );
  }

  /*
    clear textbox data
  */
  onClear(){
    this.movieForm.controls['name'].setValue('');
    this.movieForm.controls['type'].setValue('');
    this.movieForm.controls['date'].setValue('');
  }
  
}
