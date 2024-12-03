import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ConstantService } from '../_shared/constant/constant.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService{

  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ){}

  // API for only movies
  movieAPI: string = "";

  ngOninit(){
    // api set up
    this.movieAPI = this.constantService.apiUrl+ "movies";
  }

  // get movies
  getMovies(): Observable<any> {
    return this.http.get<any>(this.movieAPI);
  }

  //register movie
  // registerMovie(movieData: any):Observable<any>{
  //   // console.log("movie service reach");
  //   // console.log(this.http.post(this.constantService.apiUrl, movieData));
  //   // return this.http.post(this.movieAPI, movieData,{
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   // }
  //   // });

  //   this.http.post(this.movieAPI, movieData).subscribe(
  //     response => {
  //         console.log('Success:', response);
  //     },
  //     error => {
  //         console.error('Error:', error);
  //         if (error.error instanceof ErrorEvent) {
  //             // Client-side error
  //             console.error('Client-side error:', error.error.message);
  //         } else {
  //             // Server-side error
  //             console.error('Server-side error:', error.error);
  //         }
  //     }
  //     return throwError(error); 
  // );
  // }

  registerMovie(movieData: any): Observable<any> {
    const movie = {
      "name": movieData.name,
      "type": movieData.type,
      "date": movieData.date
    }
    return this.http.post(this.movieAPI, movie).pipe(
        
    );
    let headers = new HttpHeaders(
    {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Access-Control-Allow-Credentials' : true
    });
    return this.http.post(this.movieAPI,movie,{headers: headers}).pipe(res => {
    return res;
    });
}
}
