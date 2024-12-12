import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  //constant api
  public apiUrl = 'http://localhost:8080/api/';
  // select object for passing
  private selectedObject: any;

  // Use BehaviorSubject to store the data and make it available to subscribers
  private movieDataSource = new BehaviorSubject<any>(null);
  currentMovieData = this.movieDataSource.asObservable(); // Observable for the components to subscribe to

  constructor() { }

  // movie from the home
  movieFromHome(movie: object): void {
    this.movieDataSource.next(movie);
  }

  
 // getter and setter for object
  setObject(object: any) {
    this.selectedObject = object;
  }

  getObject() {
    return this.selectedObject;
  }
}
