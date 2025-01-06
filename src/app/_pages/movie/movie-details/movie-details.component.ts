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
  // actorids from checkboxes and dropdown
  arrActorIds: number[] = [];
  // actorids store as string
  selectedActorIds: string = "";
  showCheckboxes: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private actorService: ActorService,
    private directorService: DirectorService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    if (this.movieDetails) {
      this.isEdit = true;
    }

    Promise.all([
      this.actorService.getAllActors().toPromise(),
      this.directorService.getAllDirectors().toPromise(),
      this.companyService.getAllCompanies().toPromise(),
    ])
      .then(([actors, directors, companies]) => {
        this.actorDetails = actors;
        this.directorDetails = directors;
        this.companyDetails = companies;

        if (this.isEdit) {
          this.patchFormValues();
        }
      })
      .catch(this.handleError);
  }

  private initializeForm(): void {
    this.movieForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ]),
      type: new FormControl('', [Validators.required]),
      actorids: new FormControl(''),
      director: new FormControl('0', [Validators.required]),
      company: new FormControl('0', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });
  }

  private patchFormValues(): void {
    const actorIdsArray = this.movieDetails.actorids?.split(',').map((id: string) => parseInt(id.trim(), 10)) || [];

    this.movieForm.patchValue({
      name: this.movieDetails.name,
      type: this.movieDetails.type,
      actorids: this.movieDetails.actorids,
      director: this.movieDetails.directorid,
      company: this.movieDetails.companyid,
      language: this.movieDetails.language,
      year: this.movieDetails.year,
    });

    // Map actor IDs to names and update selectedActors
    this.selectedActors = actorIdsArray
      // Find the actor by ID and get their name
      .map((id: number) => this.actorDetails?.find((actor: any) => actor.id === id)?.name)
      // Remove any undefined names
      .filter((name: string): name is string => !!name);
    // pre checked if existing actor value
    this.arrActorIds = actorIdsArray;
    // bind id if existing actor value
    this.selectedActorIds = actorIdsArray.join(',');
  }

  private handleError(error: any): void {
    console.error('Error:', error);
  }

  private createMovieObject(): Movie {
    return {
      name: this.movieForm.value.name || '',
      type: this.movieForm.value.type || '',
      actorids: this.selectedActorIds,
      directorid: +this.movieForm.value.director || 0,
      companyid: +this.movieForm.value.company || 0,
      language: this.movieForm.value.language || '',
      year: this.movieForm.value.year || '',
      rating: 0,
    };
  }

  onRegister(): void {
    const movie = this.createMovieObject();

    this.movieService.registerMovie(movie).subscribe((response) => {
      localStorage.setItem('movie', JSON.stringify(response));
      this.router.navigate(['/movies']);
    });
  }

  onUpdate(): void {
    const movie = this.createMovieObject();
    this.movieService.updateMovie(this.movieDetails.id, movie).subscribe((response) => {
      localStorage.setItem('movie', JSON.stringify(response));
      this.router.navigate(['/movies']);
    });
  }

  // show and hide select box like as traditional dropdown
  toggleCheckboxes(): void {
    this.showCheckboxes = !this.showCheckboxes;
  }

  /**
   * get data from checkbox and dropdown
   */
  onCheckboxChange(event: any, actor: any): void {
    const { checked } = event.target;
    const { id, name } = actor;

    if (checked) {
      this.selectedActors.push(name);
      this.arrActorIds.push(id);
    } else {
      this.selectedActors = this.selectedActors.filter((actorName) => actorName !== name);
      this.arrActorIds = this.arrActorIds.filter((actorId) => actorId !== id);
    }

    this.selectedActorIds = this.arrActorIds.join(',');
  }
}
