import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { MoviesComponent } from './_pages/movie/movies/movies.component';
import { MovieDetailsComponent } from './_pages/movie/movie-details/movie-details.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { HeaderComponent } from './_shared/header/header.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    CommonModule,
    HomeComponent,
    MoviesComponent,
    MovieDetailsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Angular_ProjectA';
  isLoginRoute: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the login route
        this.isLoginRoute = (event.url === '/login' || event.url === ''||event.url === '/'|| event.url === '/signup') ;
      }
    });
  }
}
