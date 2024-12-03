import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from '../movie/movies/movies.component';
import { HeaderComponent } from '../../_shared/header/header.component';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { ConstantService } from '../../_shared/constant/constant.service';

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

export class HomeComponent {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private constantService: ConstantService
  ) {}
  // Add logic or data bindings specific to the homepage if needed
  strAccountName : string = 'Jay Mg Mg';
  blnCollapse : boolean = false;
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  CollapseOn(){
    this.blnCollapse = !this.blnCollapse;
  }

  movies = [
    { id: 1, name: 'movie 1' },
    { id: 2, name: 'movie 2' },
    { id: 3, name: 'movie 3' },
    { id: 4, name: 'movie 1' },
    { id: 5, name: 'movie 2' },
    { id: 6, name: 'movie 3' },
    { id: 1, name: 'movie 1' },
    { id: 2, name: 'movie 2' },
    { id: 3, name: 'movie 3' },
    { id: 4, name: 'movie 1' },
  ];

  //send current movie to the movie component
  currentMovie(){
    const movie = {
      name: "Titanic",
      type: "Drama"
    }
    // Update the data in the service
    this.constantService.movieFromHome(movie); 
  }
}