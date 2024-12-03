import { Routes } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { MoviesComponent } from './_pages/movie/movies/movies.component';
import { MovieDetailsComponent } from './_pages/movie/movie-details/movie-details.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'movies', component: MoviesComponent,
        children:[
            { path: 'movie-details', component: MovieDetailsComponent},
        ]
    },
];