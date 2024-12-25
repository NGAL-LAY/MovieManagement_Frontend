import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../_shared/constant/constant.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // API for only company
  companyAPI: string = "";

  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ) {
    // api set up
    this.companyAPI = this.constantService.apiUrl + "companies";
  }

  /**
   * get all companies
   */
  getAllCompanies(): Observable<any> {
    return this.http.get<any>(this.companyAPI).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * register new company
   */
  registerCompany(companyData: Company): Observable<Company> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Company>(this.companyAPI, companyData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
  * update company
  */
  updateCompany(id: number, company: Company): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<number>(`${this.companyAPI}/${id}`, company, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }

  /**
   * delete company
   */
  deleteCompanyByIds(companyIds: number[]): Observable<any> {
    //header and body create send by http
    const headers = { 'Content-Type': 'application/json' };
    const options = {
      headers: headers,
      body: companyIds
    };
    return this.http.delete<number>(this.companyAPI, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Not Found');
        }
        return throwError('An unexpected error occurred');
      })
    );
  }
}

// company interface
export interface Company {
  name: string;
  releaseMovies: number;
  country: string,
  openDate: string
}