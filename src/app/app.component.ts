import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { MoviesComponent } from './_pages/movie/movies/movies.component';
import { MovieDetailsComponent } from './_pages/movie/movie-details/movie-details.component';
import { LoginComponent } from './_pages/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    HomeComponent,
    MoviesComponent,
    MovieDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular_ProjectA';
}
