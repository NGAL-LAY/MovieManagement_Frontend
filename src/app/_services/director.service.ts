import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../_shared/constant/constant.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  // API for only director
    directorAPI: string = "";
  
    constructor(
      private http: HttpClient,
      private constantService: ConstantService
    ) {
      // api set up
      this.directorAPI = this.constantService.apiUrl + "directors";
    }
  
    /**
     * get all directors
     */
    getAllDirectors(): Observable<any> {
      return this.http.get<any>(this.directorAPI).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError('Not Found');
          }
          return throwError('An unexpected error occurred');
        })
      );
    }
  
    /**
     * register new director
     */
    registerDirector(directorData: Director): Observable<Director> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<Director>(this.directorAPI, directorData, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError('Not Found');
          }
          return throwError('An unexpected error occurred');
        })
      );
    }
  
    /**
    * update director
    */
    updateDirector(id: number, director: Director): Observable<any> {
      console.log("Id",id, "Director", director);
      
      const headers = { 'Content-Type': 'application/json' };
      return this.http.put<number>(`${this.directorAPI}/${id}`, director, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError('Not Found');
          }
          return throwError('An unexpected error occurred');
        })
      );
    }
  
    /**
     * delete director
     */
    deleteDirectorByIds(directorIds: number[]): Observable<any> {
      //header and body create send by http
      const headers = { 'Content-Type': 'application/json' };
      const options = {
        headers: headers,
        body: directorIds
      };
      return this.http.delete<number>(this.directorAPI, options).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError('Not Found');
          }
          return throwError('An unexpected error occurred');
        })
      );
    }
  }
  
  // director interface
  export interface Director {
    name: string;
    gentle: string;
    nationality: string
  }
