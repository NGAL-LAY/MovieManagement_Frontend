import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.css'
})
export class ActorDetailsComponent implements OnInit {

  // actor details from parent actor
  @Input() actorDetails: any;
  actorForm!: FormGroup;
  // edit status
  isEdit: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actorForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern(/^[A-Za-z][A-Za-z0-9\s]*$/)
      ]),
      gentle: new FormControl('m', [
        Validators.required
      ]),
      nationality: new FormControl('', [
        Validators.required
      ]),
    });

    // Dynamically set values
    if (this.actorDetails?.name) {
      this.isEdit = true;
      this.actorForm.patchValue({
        name: this.actorDetails.name,
        type: this.actorDetails.type,
        date: this.actorDetails.year
      });
    }
  }

  /*
      new actor register  
    */
  onRegister() {
    // const movie: Movie = {
    //   name: this.movieForm.value.name || '',  
    //   type: this.movieForm.value.type || '', 
    //   year: this.movieForm.value.date || '',  
    // };
    //   this.movieService.registerMovie(movie).subscribe(
    //     (response) => {
    //       localStorage.setItem('movie', JSON.stringify(response));
    //       this.router.navigate(['/movies']);
    //     }
    //   );
  }

  /*
    actor update  
  */
  onUpdate() {
    //   const movie: Movie = {
    //     name: this.movieForm.value.name || '',  
    //     type: this.movieForm.value.type || '', 
    //     year: this.movieForm.value.date || '',  
    //   };
    //   this.movieService.updateMovie(this.movieDetails.id,movie).subscribe(
    //     (response) => {
    //       localStorage.setItem('movie', JSON.stringify(response));
    //       this.router.navigate(['/movies']);
    //     }
    //   );
    }
  }
