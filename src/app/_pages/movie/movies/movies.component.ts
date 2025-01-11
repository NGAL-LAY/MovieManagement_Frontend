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
import { ActorService } from '../../../_services/actor.service';
import { DirectorService } from '../../../_services/director.service';

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
  //to store movies
  movies: any;
  // to transfer moviedetails
  movieDetails: any;
  actorDetails: any;
  directorDetails: any;
  strMovieAbout: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sequi explicabo commodi iusto obcaecati. Molestiae, illo nostrum. Asperiores ullam atque eos facere a optio rem corrupti blanditiis nisi, vitae reiciendis.';
  // comments 
  strComments: string = '';
  strActorsName: string = '';
  strDirectorName: string = '';
  intUserId: number = 0;
  // rating 
  intRating: number = 0;
  //user role
  blnAdmin: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private commentService: CommentService,
    private actorService: ActorService,
    private directorService: DirectorService
  ) { }

  ngOnInit(): void {
    // Refresh logic on navigation to the same route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/movies') {
        this.getAllMovies();
        this.refreshMovies();
      }
    });

    // Initial load
    this.userPermission();
    this.getAllMovies();
    this.refreshMovies();
  }

  private userPermission() {
    if (typeof window !== 'undefined') {
      const strDataFromLS = localStorage.getItem('userRole');
      const strUserRole = strDataFromLS ? JSON.parse(strDataFromLS) : '';
      this.blnAdmin = strUserRole === 'admin' ? true : false;
    }
  }

  /**
   * fetch all movie
   */
  getAllMovies() {
    this.movieService.getAllMovies().subscribe(
      (response) => {
        this.movies = response;
      }, (error) => {
        this.router.navigate(['/404']);
        console.log("No response error", error);
      }
    );
  }

  /**
     * get movie data from storage
     */
  refreshMovies(): void {
    if (typeof window !== 'undefined') {
      const movieData = localStorage.getItem('movie');
      if (movieData) {
        this.movie = JSON.parse(movieData);
        Promise.all([
          this.actorService.getAllActors().toPromise(),
          this.directorService.getAllDirectors().toPromise()
        ]).then(([actors, directors]) => {
          this.actorDetails = actors;
          this.directorDetails = directors;

          let intArrActorId = this.movie.actorids.split(',').map((id: string) => parseInt(id.trim(), 10) || []);
          let strDirectorId = this.movie.directorid;
          let strArrActorName = intArrActorId
            .map((id: number) => this.actorDetails
              ?.find((actor: any) => actor.id === id)?.name)
            ?.filter((name: string): name is string => !!name);

          this.strActorsName = strArrActorName.join(',');

          this.strDirectorName = this.directorDetails?.find((director: any) => director.id === strDirectorId)?.name;

        }).catch(error => {
          console.log(this.handleError(error));
        })
      }
    }
  }

  private handleError(error: any): void {
    console.error('Error:', error);
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

  changeActiveMoive(movie: any) {
    localStorage.setItem('movie', JSON.stringify(movie));
    this.movie = movie;
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
    // get userid from local storage
    if (typeof window !== 'undefined') {
      const intUserId = localStorage.getItem('userId');
      this.intUserId = intUserId ? +JSON.parse(intUserId) : 0;
    }

    // set comment data from popup form
    if (this.strComments || this.intRating) {
      const comment: Comment = {
        movieid: +this.movie?.id,
        userid: this.intUserId,
        comments: this.strComments,
        rating: +this.intRating
      };
      this.commentService.registerComment(comment).subscribe(
        (response) => {
          this.strComments = "";
          this.intRating = 0;
        }, (error) => {
          this.router.navigate(['/404']);
          console.log("Register fail error", error);
        }
      );
    }
  }
}