import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../_shared/constant/constant.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // API for only comment
  commentAPI: string = "";

  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ) {
    // api set up
    this.commentAPI = this.constantService.apiUrl + "comments";
  }

  /**
   * get all comments
   */
  getAllComments(): Observable<any> {
    return this.http.get<any>(this.commentAPI).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * get comment by name
   */
  getMovieByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.commentAPI}/${name}`).pipe(
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
  registerComment(commentData: Comment): Observable<Comment> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Comment>(this.commentAPI, commentData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * delete comment
   */
  deleteCommentByIds(commentIds: number[]): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const options = {
      headers: headers,
      body: commentIds
    };
    return this.http.delete<number>(this.commentAPI, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }
}

// comment interface
export interface Comment {
  movieid: number;
  userid: number;
  comments: string;
  rating: number
}
