import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../../_services/movie.service';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  //constant api
  public apiUrl = 'http://localhost:8080/api/';

  // Use BehaviorSubject to store the data and make it available to subscribers
  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable(); // Observable for the components to subscribe to

  constructor() { }

  // getter and setter for object
  setObject(object: any) {
    this.dataSource.next(object);
  }

  getObject() {
    return this.currentData;
  }
}
