import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.css'
})
export class ActorDetailsComponent {

  // actor details from parent actor
  @Input() actorDetails: any;
}
