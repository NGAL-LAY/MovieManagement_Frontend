import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../_shared/constant/constant.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  // API for only actor
  actorAPI: string = "";

  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ) {
    // api set up
    this.actorAPI = this.constantService.apiUrl + "actors";
  }

  /**
   * get all actors
   */
  getAllActors(): Observable<any> {
    return this.http.get<any>(this.actorAPI).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * register new actor
   */
  registerActor(actorData: Actor): Observable<Actor> {
    console.log("This is register function", actorData);

    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Actor>(this.actorAPI, actorData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * update actor
   */
  updateActor(id: number, actor: Actor): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<number>(`${this.actorAPI}/${id}`, actor, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * delete actor
   */
  deleteActorByIds(actorIds: number[]): Observable<any> {
    //header and body create send by http
    const headers = { 'Content-Type': 'application/json' };
    const options = {
      headers: headers,
      body: actorIds
    };
    return this.http.delete<number>(this.actorAPI, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }
}

// actor interface
export interface Actor {
  name: string;
  gentle: string;
  nationality: string
}