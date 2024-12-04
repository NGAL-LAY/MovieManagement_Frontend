import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../../_shared/datepicker/datepicker.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    DatepickerComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {

  constructor(){}

  movieForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(25)
    ]),
    type: new FormControl('',[
      Validators.required
    ]),
    date: new FormControl('' ,[
      Validators.required,
      Validators.pattern(/^\d{4}-\d{2}-\d{2}$/) // YYYY-MM-DD format
    ])
  });

  /*
    new movie register  
  */
  onRegister(){
    console.log(this.movieForm.value);
  }

  /*
    clear textbox data
  */
  onClear(){
    this.movieForm.controls.name.setValue('');
    this.movieForm.controls.type.setValue('');
    this.movieForm.controls.date.setValue('');
  }
}
