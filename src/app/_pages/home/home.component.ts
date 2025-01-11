import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from '../movie/movies/movies.component';
import { MovieService } from '../../_services/movie.service';
import { CommentService } from '../../_services/comment.service';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ]
})

export class HomeComponent implements OnInit {

  //store movies list
  movies: any[] = [];
  //store comments list
  comments: any[] = [];
  activeGenre: string = 'all';
  //user role
  blnAdmin: boolean = false;
  //selected rating
  selectedRating: string = "";
  //selected language
  selectedLanguage: string = "";
  //search value
  searchValue: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private movieService: MovieService,
    private commentService: CommentService
  ) { }

  async ngOnInit() {
    try {
      this.userPermission();
      await this.loadMoviesAndComments();
      this.calculateMovieRatings();
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }

  private userPermission() {
    if (typeof window !== 'undefined') {
      const strDataFromLS = localStorage.getItem('userRole');
      const strUserRole = strDataFromLS ? JSON.parse(strDataFromLS) : '';
      this.blnAdmin = strUserRole === 'admin' ? true : false;
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

    this.calculateMovieRatings();
  }

  /**
   * Calculate movie ratings
   */
  calculateMovieRatings(): void {
    const ratingsMap = new Map<number, { totalRating: number; count: number }>();

    this.comments.forEach(({ movieid, rating = 0 }) => {
      const entry = ratingsMap.get(movieid) || { totalRating: 0, count: 0 };
      ratingsMap.set(movieid, {
        totalRating: entry.totalRating + rating,
        count: entry.count + 1,
      });
    });

    this.movies = this.movies.map((movie) => ({
      ...movie,
      rating: ratingsMap.get(movie.id)?.totalRating || 0,
      numOfUsers: ratingsMap.get(movie.id)?.count || 0,
    }));
  }

  /**
   * Filter movies based on multiple criteria
   */
  filterMovies(name: string = '', language: string = '', rating: string = ''): void {
    this.movies = this.movies
      .filter((movie) =>
        (!name || movie.name?.toLowerCase().includes(name.toLowerCase())) &&
        (!language || movie.language?.toLowerCase().includes(language.toLowerCase())) &&
        (!rating ||
          (movie.numOfUsers > 0 && (movie.rating / movie.numOfUsers) >= parseInt(rating)))
      );
  }

  /**
   * Search function
   */
  onSearch(name: string): void {
    this.loadMoviesAndComments().then(() => {
      this.filterMovies(name, this.selectedLanguage, this.selectedRating);
    });
  }

  /*
  * filter by movie genre
  */
  onGenreClick(genre: string): void {
    this.selectedLanguage = "";
    this.selectedRating = "";
    this.searchValue = "";
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
          } else {
            console.error("Http error", error);
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
