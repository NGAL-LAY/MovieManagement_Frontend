import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from '../movie/movies/movies.component';
import { Movie, MovieService } from '../../_services/movie.service';
import { CommentService } from '../../_services/comment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    MoviesComponent,
  ]
})

export class HomeComponent implements OnInit {

  //store movies list
  movies: any[] = [];
  // allMovies = {
  //   id : 0,
  //   name: "",
  //   type: "",
  //   actorids: "",
  //   directorid: 0,
  //   companyid: 0,
  //   language: "",
  //   year: "",
  //   rating: ""
  // };
  //store comments list
  comments: any[] = [];
  activeGenre: string = 'all';

  constructor(
    private authService: AuthService,
    private router: Router,
    private movieService: MovieService,
    private commentService: CommentService
  ) { }

  async ngOnInit() {
    try {
      await this.loadMoviesAndComments();
      this.calculateMovieRatings();
      console.log("Updated movies with ratings:", this.movies);
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }

  /**
   * fetch all movies and comments
   */
  async loadMoviesAndComments(): Promise<void> {
    const [movies, comments] = await Promise.all([
      this.movieService.getAllMovies().toPromise(),
      this.commentService.getAllComments().toPromise(),
    ]);
  
    this.movies = movies || [];
    this.comments = comments || [];
  }

  /**
   * get movie rating
   */
  calculateMovieRatings(): void {
  console.log("Calculating movie ratings...");

  // Step 1: Create a map of movie IDs to their cumulative ratings
  const ratingsMap = new Map<number, number>();

  this.comments.forEach((comment) => {
    const movieId = comment.movieid;
    const rating = comment.rating || 0;

    // Accumulate ratings
    ratingsMap.set(movieId, (ratingsMap.get(movieId) || 0) + rating);
  });

  // Step 2: Update each movie's rating
  this.movies = this.movies.map((movie) => ({
    ...movie,
    rating: ratingsMap.get(movie.id) || 0, // Default rating is 0 if no comments
  }));
}

  // fetch movies by name
  getMovieByName(name: string) {
    this.movies = this.movies.filter(movie => movie.name.toLowerCase().includes(name.toLowerCase()));
  }

  /*
  * seach function
  */
  onSearch(name: string) {
    if (!name) {
      this.movieService.getAllMovies().subscribe(
        (response) => {
          this.movies = response;
        },
        (error) => {
          console.error("Http error", error)
        }
      );
    } else {
      this.movieService.getAllMovies().subscribe(
        (response) => {
          this.movies = response.filter(
            (data: any) => data.name.toLowerCase().includes(name.toLowerCase()));
        },
        (error) => {
          console.error("Http error", error);
        }
      );
    }
  }

  /*
  * filter by movie genre
  */
  onGenreClick(genre: string): void {
    // Set the clicked genre as active
    this.activeGenre = genre;

    if (this.activeGenre === 'all') {
      // all movies
      this.movieService.getAllMovies().subscribe(
        (response) => {
          this.movies = response;
        },
        (error) => {
          console.error("Http error", error)
        }
      );
    } else {
      // Fetch all movies and filter by genre
      this.movieService.getAllMovies().subscribe(
        (data) => {
          this.movies = data.filter((m: { type: string; }) => m.type.toLowerCase() === genre.toLowerCase());
        },
        (error) => {
          if (error === 'Not Found') {
            this.router.navigate(['/404']);
          }else{
            console.error("Http error",error);
          }
        }
      );
    }
  }

  /*
  * selected movie
  */
  selectMovie(movie: any) {
    localStorage.setItem('movie', JSON.stringify(movie));
    this.router.navigate(['/movies']);
  }

  /*
  * add function for actors, directors and companies
  */
  onAdd() {
    this.router.navigate(['/actors']);
  }

  /*
  * logout function
  */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
