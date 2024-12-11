import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ConstantService } from '../_shared/constant/constant.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MovieService{

  // API for only movies
  movieAPI: string = "";

  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ){
    // api set up
    this.movieAPI = this.constantService.apiUrl+ "movies";
  }

  // get movies
  getAllMovies(): Observable<any> {
    return this.http.get<any>(this.movieAPI).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  // Register a new movie
  registerMovie(movie: Movie): Observable<Movie> {
    console.log("Movies service",movie);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Movie>(this.movieAPI, movie,{headers});
  }
}

export interface Movie {
  name: string;
  type: string;
  date: string; 
}