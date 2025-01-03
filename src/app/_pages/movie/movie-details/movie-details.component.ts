import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../../_shared/datepicker/datepicker.component';
import { Router, RouterLink } from '@angular/router';
import { Movie, MovieService } from '../../../_services/movie.service';
import { ActorService } from '../../../_services/actor.service';
import { DirectorService } from '../../../_services/director.service';
import { CompanyService } from '../../../_services/company.service';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    DatepickerComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  // movie details from parent movie
  @Input() movieDetails: any;
  movieForm!: FormGroup;
  // edit status
  isEdit: boolean = false;
  // actor details
  actorDetails: any;
  // director details
  directorDetails: any;
  // company details
  companyDetails: any;
  // actors from checkboxes and dropdown
  selectedActors: string[] = [];
  showCheckboxes:boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private actorService: ActorService,
    private directorService: DirectorService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.movieForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]),
      type: new FormControl('', [
        Validators.required
      ]),
      actorids: new FormControl(''),
      director: new FormControl('0', [
        Validators.required
      ]),
      company: new FormControl('0', [
        Validators.required
      ]),
      language: new FormControl('', [
        Validators.required
      ]),
      year: new FormControl('', [
        Validators.required
      ]),
    });

    // Dynamically set values
    if (this.movieDetails) {
      this.isEdit = true;
      this.movieForm.patchValue({
        name: this.movieDetails.name,
        type: this.movieDetails.type,
        date: this.movieDetails.year
      });
    }

    // fetch actor, director and company
    this.getAllActors();
    this.getAllDirectors();
    this.getAllCompanies();
  }

  /*
    fetch all actors  
  */
  getAllActors() {
    this.actorService.getAllActors().subscribe(
      (data) => {
        this.actorDetails = data;
      }, (error) => {
        console.log('Error fetched:', error);
      }
    );
  }

  /*
    fetch all directors  
  */
  getAllDirectors() {
    this.directorService.getAllDirectors().subscribe(
      (data) => {
        this.directorDetails = data;
      }, (error) => {
        console.log('Error fetched:', error);
      }
    );
  }

/*
 fetch all companies  
*/
  getAllCompanies() {
    this.companyService.getAllCompanies().subscribe(
      (data) => {
        this.companyDetails = data;
      }, (error) => {
        console.log('Error fetched:', error);
      }
    );
  }

  /*
    new movie register  
  */
  onRegister() {
    const movie: Movie = {
      name: this.movieForm.value.name || '',
      type: this.movieForm.value.type || '',
      year: this.movieForm.value.date || '',
    };
    this.movieService.registerMovie(movie).subscribe(
      (response) => {
        localStorage.setItem('movie', JSON.stringify(response));
        this.router.navigate(['/movies']);
      }
    );
  }

  /*
    movie update  
  */
  onUpdate() {
    const movie: Movie = {
      name: this.movieForm.value.name || '',
      type: this.movieForm.value.type || '',
      year: this.movieForm.value.date || '',
    };
    this.movieService.updateMovie(this.movieDetails.id, movie).subscribe(
      (response) => {
        localStorage.setItem('movie', JSON.stringify(response));
        this.router.navigate(['/movies']);
      }
    );
  }

    // show and hide select box like as traditional dropdown
    toggleCheckboxes(): void {
      this.showCheckboxes = !this.showCheckboxes;
    }
  
    /**
     * get data from checkbox and dropdown
     */
    onCheckboxChange(event: any, data: any): void {
      if (event.target.checked) {
        this.selectedActors.push(data.name);
      } else {
        this.selectedActors = this.selectedActors.filter(
          (name) => name !== data.name
        );
      }
    }
}
