import { Routes } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { MoviesComponent } from './_pages/movie/movies/movies.component';
import { MovieDetailsComponent } from './_pages/movie/movie-details/movie-details.component';
import { NotFoundComponent } from './_shared/not-found/not-found.component';
import { CommentsComponent } from './_pages/comments/comments.component';
import { ActorsComponent } from './_pages/actor/actors/actors.component';
import { ActorDetailsComponent } from './_pages/actor/actor-details/actor-details.component';
import { DirectorsComponent } from './_pages/director/directors/directors.component';
import { DirectorDetailsComponent } from './_pages/director/director-details/director-details.component';
import { CompaniesComponent } from './_pages/company/companies/companies.component';
import { CompanyDetailsComponent } from './_pages/company/company-details/company-details.component';
import { SignupComponent } from './_pages/auth/signup/signup.component';
import { UsersComponent } from './_pages/user/users/users.component';
import { UserDetailsComponent } from './_pages/user/user-details/user-details.component';

export const routes: Routes = [
    { path: '404', component: NotFoundComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'movies', component: MoviesComponent,
        children: [
            { path: 'movie-details', component: MovieDetailsComponent },
        ]
    },
    { path: 'actors', component: ActorsComponent },
    { path: 'actors/actor-details', component: ActorDetailsComponent },
    { path: 'directors', component: DirectorsComponent },
    { path: 'directors/director-details', component: DirectorDetailsComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'companies/company-details', component: CompanyDetailsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/user-details', component: UserDetailsComponent },
    { path: 'comments', component: CommentsComponent },
    { path: '**', redirectTo: '/404' }, // Wildcard route for handling 404
];