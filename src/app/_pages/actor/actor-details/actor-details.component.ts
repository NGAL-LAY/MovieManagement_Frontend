import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Actor, ActorService } from '../../../_services/actor.service';
import { ConstantService } from '../../../_shared/constant/constant.service';

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

  // actor details from actor
  actorDetails: any;
  actorForm!: FormGroup;
  // edit status
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private actorService: ActorService,
    private constantService: ConstantService
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

    // actor details set by shared service
    this.constantService.currentData.subscribe((actors) => {
      this.actorDetails = actors;
      // Dynamically set values
      if (this.actorDetails) {
        this.isEdit = true;
        this.actorForm.patchValue({
          name: this.actorDetails.name,
          gentle: this.actorDetails.gentle,
          nationality: this.actorDetails.nationality
        });
      }
    });
  }

  /*
    new actor register  
  */
  onRegister() {
    const actor: Actor = {
      name: this.actorForm.value.name || '',
      gentle: this.actorForm.value.gentle || '',
      nationality: this.actorForm.value.nationality || '',
    };

    this.actorService.registerActor(actor).subscribe(
      (response) => {
        // localStorage.setItem('movie', JSON.stringify(response));
        this.router.navigate(['/actors']);
      }, (error) => {
        this.router.navigate(['/404'])
      }
    );
  }

  /*
    actor update  
  */
  onUpdate() {
    const actor: Actor = {
      name: this.actorForm.value.name || '',
      gentle: this.actorForm.value.gentle || '',
      nationality: this.actorForm.value.nationality || '',
    };

    this.actorService.updateActor(this.actorDetails.id, actor).subscribe(
      (response) => {
        this.router.navigate(['/actors']);
      }, (error) => {
        this.router.navigate(['/404'])
      }
    );
  }
}
