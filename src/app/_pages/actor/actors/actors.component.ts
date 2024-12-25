import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../_shared/header/header.component';
import { FooterComponent } from '../../../_shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActorService } from '../../../_services/actor.service';
import { ActorDetailsComponent } from '../actor-details/actor-details.component';
import { ConstantService } from '../../../_shared/constant/constant.service';

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    FormsModule,
    ActorDetailsComponent
  ],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.css'
})
export class ActorsComponent implements OnInit{

  // to transfer actordetails
  actorDetails: any;
  // store all actors
  actors: any[] = [];
  // check or not all checkboxes
  isAllChecked: boolean = false;
  // check or not individual checkbox
  isCheckedItems: boolean[] = [];
  // select actor id
  selectedActorIds: number[] = [];

  constructor(
    private router: Router,
    private actorService: ActorService,
    private constantService: ConstantService
  ) { }

  ngOnInit(): void {
    this.getAllActors();
  }

/*
* fetch all actors
*/
getAllActors(){
  this.actorService.getAllActors().subscribe(
    (data)=> {
        this.actors = data;
        this.fillCheckedItems();
    },(error)=>{
      console.log('Error fetched:',error);
    }
  );
}

/*
* new actor to route actor-details
*/
onNewActor(){
  this.actorDetails = [];
  this.constantService.setObject(this.actorDetails);
  this.router.navigate(['/actors/actor-details']);
}

/*
* edit actor to route actor-details
*/
onEditActor(){
  const editActorId = this.selectedActorIds[0];
  this.actorDetails = this.actors.find(actor => actor.id === editActorId);
  if(this.actorDetails != null){
    this.constantService.setObject(this.actorDetails);
    this.router.navigate(['/actors/actor-details']);
  }
}

/*
*seach function
*/
onSearch(name: string){
  if(!name){
    this.getAllActors();
  }else{
    this.actorService.getAllActors().subscribe(
      (response)=>{
        this.actors = response.filter(
          (data:any)=> data.name.toLowerCase().includes(name.toLowerCase()));
      }
    );
  }
}

/*
*delete actor
*/
onDelete() {
  // checked actors
  const checkedActorIds = this.actors.filter(
    (actors, index) => this.isCheckedItems[index]).map(
      (actor) => actor.id);

  if (checkedActorIds.length === 0) {
    alert("No actors selected for deletion.");
    return;
  }

  // call actor service
  this.actorService.deleteActorByIds(checkedActorIds).subscribe(
    (response) => {
      // 
      this.actors = this.actors.filter(
        (actor, index) => !this.isCheckedItems[index]
      );
      this.fillCheckedItems();
      alert("Actor delete successfully");
    }, (error) => {
      alert("Actor delete Error");
    }
  )
}



/*
* set initial value of all check box
*/
fillCheckedItems(){
  this.isCheckedItems = new Array(this.actors.length).fill(false);
 }

/*
* check or not all check box by master checkbox
*/
toggleAllCheckBoxes():void{
  this.isCheckedItems.fill(this.isAllChecked);
  // handle of edit button
  if(!this.isAllChecked){
    this.selectedActorIds = [];
  }else{
    this.selectedActorIds = this.actors.map(actor => actor.id);
  }
}

/*
* check or not individual and check or not master checkbox depends on individual check box
*/
toggleCheckBox(index: number, actorId: number,  event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const isChecked = inputElement.checked;
  //get checked id
  if(isChecked){
    this.selectedActorIds.push(actorId);
  } else {
    this.selectedActorIds = this.selectedActorIds.filter(id => id !== actorId);
  }
  this.isCheckedItems[index] = isChecked;
  this.isAllChecked = this.isCheckedItems.every((checked) => checked);
}

/**
 * @returns false
 */
isDisabled(): boolean {
  return this.selectedActorIds.length === 1 && !this.isAllChecked;
}
}