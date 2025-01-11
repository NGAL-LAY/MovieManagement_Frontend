import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../_shared/constant/constant.service';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // API for only user
  userAPI: string = "";
  // to store users
  users: any = [];

  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ) {
    // api set up
    this.userAPI = this.constantService.apiUrl + "users";
  }

  /**
   * get all users
   */
  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.userAPI).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * register new user
   */
  registerUser(userData: User): Observable<User> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<User>(this.userAPI, userData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * update user
   */
  updateUser(id: number, actor: User): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<number>(`${this.userAPI}/${id}`, actor, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * delete user
   */
  deleteUserByIds(actorIds: number[]): Observable<any> {
    //header and body create send by http
    const headers = { 'Content-Type': 'application/json' };
    const options = {
      headers: headers,
      body: actorIds
    };
    return this.http.delete<number>(this.userAPI, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  // fetch user id by email and password
  async getUserId(email: string, password: string) {
    this.users = await firstValueFrom(this.getAllUsers());
    const strUserId = this.users.find((user: any) =>
      user.email === email && user.password === password)?.id;
    return strUserId;
  }

  // fetch user name by email and password
  async getUserName(email: string, password: string) {
    this.users = await firstValueFrom(this.getAllUsers());
    const strUserName = this.users.find((user: any) =>
      user.email === email && user.password === password)?.name;
    return strUserName;
  }

  // fetch user role by email and password
  async getUserRole(email: string, password: string) {
    this.users = await firstValueFrom(this.getAllUsers());
    const strUserRole = this.users.find((user: any) =>
      user.email === email && user.password === password)?.role;
    return strUserRole;
  }
}

// user interface
export interface User {
  name: string;
  password: string;
  email: string;
  nationality: string,
  age: number;
  gentle: string;
  role: string;
}
