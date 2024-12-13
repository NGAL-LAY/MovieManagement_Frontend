import { Component} from '@angular/core';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../_shared/header/header.component';
import { FooterComponent } from '../../../_shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../_services/movie.service';
import { ConstantService } from '../../../_shared/constant/constant.service';
import { ReactiveFormsModule } from '@angular/forms';
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

  //to store movie
  movie: any;
  // to transfer moviedetails
  movieDetails: any;
  // to check delete successfully
  isDeleted: boolean = false;
  strMovieAbout: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.';
  
  constructor(
    private movieService: MovieService,
    private constantService: ConstantService,
    private router: Router
  )
  {}

  ngOnInit(): void {
    // value from home movie
    this.movie = this.constantService.getObject();
  }

  /**
   * check active link
   */
  isMovieDetailsActive(): boolean {
    return this.router.url.includes('movie-details');
  }

  /**
   * new movie 
   */
  onNewMovie(){
    this.movieDetails = [];
    this.router.navigate(['/movies/movie-details']);
  }

  /**
   * show movie details
   */
  onEditMovie(){
    this.movieDetails = this.movie;
    this.router.navigate(['/movies/movie-details']);
  }

  /**
   * delete movie
   */
  onDeleteMovie(){
    this.movieService.deleteMovie(this.movie?.id).subscribe(
      (response) => {
        // this.router.navigate(['/home']);
        this.isDeleted = true;
      }
    );
  }

}