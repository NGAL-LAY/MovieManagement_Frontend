import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Director, DirectorService } from '../../../_services/director.service';
import { ConstantService } from '../../../_shared/constant/constant.service';

@Component({
  selector: 'app-director-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './director-details.component.html',
  styleUrl: './director-details.component.css'
})
export class DirectorDetailsComponent implements OnInit {

  // director details from parent director
  @Input() directorDetails: any;
  directorForm!: FormGroup;
  // edit status
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private directorService: DirectorService,
    private constantService: ConstantService
  ) { }

  ngOnInit(): void {
    this.directorForm = new FormGroup({
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

    // actor details set by shared service
    this.constantService.currentData.subscribe((directors) => {
      this.directorDetails = directors;
      // Dynamically set values
      if (this.directorDetails) {
        this.isEdit = true;
        this.directorForm.patchValue({
          name: this.directorDetails.name,
          gentle: this.directorDetails.gentle,
          nationality: this.directorDetails.nationality
        });
      }
    });
  }

  /*
   *new director register  
   */
  onRegister() {
    const director: Director = {
      name: this.directorForm.value.name || '',
      gentle: this.directorForm.value.gentle || '',
      nationality: this.directorForm.value.nationality || '',
    };

    this.directorService.registerDirector(director).subscribe(
      (response) => {
        this.router.navigate(['/directors']);
      }, (error) => {
        this.router.navigate(['/404'])
      }
    );
  }

  /*
   *director update  
   */
  onUpdate() {
    const director: Director = {
      name: this.directorForm.value.name || '',
      gentle: this.directorForm.value.gentle || '',
      nationality: this.directorForm.value.nationality || '',
    };

    this.directorService.updateDirector(this.directorDetails.id, director).subscribe(
      (response) => {
        this.router.navigate(['/directors']);
      }, (error) => {
        this.router.navigate(['/404'])
      }
    );
  }
}
