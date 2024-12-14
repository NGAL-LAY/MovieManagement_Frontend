import { Routes } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { MoviesComponent } from './_pages/movie/movies/movies.component';
import { MovieDetailsComponent } from './_pages/movie/movie-details/movie-details.component';
import { NotFoundComponent } from './_shared/not-found/not-found.component';

export const routes: Routes = [
    { path: '404', component: NotFoundComponent },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'movies', component: MoviesComponent,
        children:[
            { path: 'movie-details', component: MovieDetailsComponent},
        ]
    },
];