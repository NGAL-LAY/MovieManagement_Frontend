import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ConstantService } from '../_shared/constant/constant.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // API for only movies
  movieAPI: string = "";

  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ) {
    // api set up
    this.movieAPI = this.constantService.apiUrl + "movies";
  }

  /**
   * get all movies
   */
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

  /**
   * get movie by name
   */
  getMovieByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.movieAPI}/${name}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * register new movie
   */
  registerMovie(movieData: Movie): Observable<Movie> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Movie>(this.movieAPI, movieData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * update movie
   */
  updateMovie(id: number, movie: Movie): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<number>(`${this.movieAPI}/${id}`,movie, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * delete movie
   */
  deleteMovie(id: number): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.delete<number>(`${this.movieAPI}/${id}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }
  
}

// movie interface
export interface Movie {
  name: string;
  type: string;
  actorids: string;
  directorid: number;
  companyid: number;
  language: string;
  year: string;
  rating: number
}