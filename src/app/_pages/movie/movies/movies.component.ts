import { Component, ElementRef, ViewChild } from '@angular/core';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../_shared/header/header.component';
import { FooterComponent } from '../../../_shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../_services/movie.service';
import { CommentService, Comment } from '../../../_services/comment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    DatepickerComponent,
    FormsModule
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  // comment modal dialog
  @ViewChild('myModal', { static: false }) myModal!: ElementRef;
  //to store movie
  movie: any;
  // to transfer moviedetails
  movieDetails: any;
  strMovieAbout: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.';
  // comments 
  strComments: string = '';
  // rating 
  intRating: string = '';

  constructor(
    private movieService: MovieService,
    // private constantService: ConstantService,
    private router: Router,
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    // Refresh logic on navigation to the same route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/movies') {
        this.refreshMovies();
      }
    });

    // Initial load
    this.refreshMovies();
  }

  /**
     * get movie data from storage
     */
  refreshMovies(): void {
    if (typeof window !== 'undefined') {
      const movieData = localStorage.getItem('movie');
      console.log("data from localstorage", movieData);
      
      if (movieData) {
        this.movie = JSON.parse(movieData);
      }
    }
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
  onNewMovie() {
    localStorage.setItem('movie', JSON.stringify(this.movie));
    this.movieDetails = null;
    this.router.navigate(['/movies/movie-details']);
  }

  /**
   * show movie details
   */
  onEditMovie() {
    localStorage.setItem('movie', JSON.stringify(this.movie));
    this.movieDetails = this.movie;
    this.router.navigate(['/movies/movie-details']);
  }

  /**
   * delete movie
   */
  onDeleteMovie() {
    this.movieService.deleteMovie(this.movie?.id).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      }
    );
  }

  /**
   * show movie details
   */
  onComment() {
    this.router.navigate(['/comments']);
  }

  /*
     new comment register  
   */
  onCommentsSave(): void {
    if (this.strComments || this.intRating) {
      const comment: Comment = {
        // movieid: this.movieForm.value.name || '',  
        // userid: this.movieForm.value.type || '', 
        movieid: +this.movie?.id,
        userid: 3,
        comments: this.strComments,
        rating: +this.intRating
      };
      this.commentService.registerComment(comment).subscribe(
        (response) => {
          const modalElement = this.myModal.nativeElement;
          const modalInstance = new (window as any).bootstrap.Modal(modalElement);
          modalInstance.hide();
        }
      );
    }
  }
}