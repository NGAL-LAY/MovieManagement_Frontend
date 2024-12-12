import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from '../movie/movies/movies.component';
import { HeaderComponent } from '../../_shared/header/header.component';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { ConstantService } from '../../_shared/constant/constant.service';
import { MovieService } from '../../_services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl:'./home.component.html',
  styleUrl:'./home.component.css',
  imports:[
    RouterLink,
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MoviesComponent,
  ]
})

export class HomeComponent implements OnInit{

  movies: any[] = []; //store movies list
  allMovies: any[] = [];
  activeGenre: string = 'all';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private constantService: ConstantService
  ) {}

  ngOnInit(): void {
    this.getAllMovies();
}

// fetch all movies
getAllMovies(){
  this.movieService.getAllMovies().subscribe(
    (data)=>{
    this.movies = data;
    },
    (error)=>{
      console.log('Error fetched:',error);
    }
  );
}

  // filter by genre
  getMovieByGenre(genre:string){
    this.movies = this.movies.filter(g => g.type.toLowerCase() === genre.toLowerCase());
  }

  onGenreClick(genre: string): void {
    // Set the clicked genre as active
    this.activeGenre = genre; 

    if (this.activeGenre === 'all') {
      // all movies
      this.getAllMovies();
    } else{
      // Fetch all movies and filter by genre
        this.movieService.getAllMovies().subscribe(
          (data) => {
            this.movies = data.filter((m: { type: string; }) => m.type.toLowerCase() === genre.toLowerCase());
          },
          (error) => {
            if (error === 'Not Found') {
              this.router.navigate(['/404']);
            }
          }
        );
    }
  }
  
  // transfer object(movie)
  selectMovie(movie: any) {
    this.constantService.setObject(movie);
    this.router.navigate(['/movies']);
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
