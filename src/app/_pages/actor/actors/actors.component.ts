import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../_shared/header/header.component';
import { FooterComponent } from '../../../_shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActorService } from '../../../_services/actor.service';
import { ActorDetailsComponent } from '../actor-details/actor-details.component';

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

  constructor(
    private router: Router,
    private actorService: ActorService
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
  this.router.navigate(['/actors/actor-details']);
}

/*
  *seach function
  */
  onSearch(name: string){
    // if(!name){
    //   this.getAllComments();
    // }else{
    //   this.commentService.getAllComments().subscribe(
    //     (response)=>{
    //       this.comments = response.filter(
    //         (data:any)=> data.comments.toLowerCase().includes(name.toLowerCase()));
    //     }
    //   );
    // }
  }

  /*
  *delete comment
  */
  onDelete(){
    // checked comments
    // const checkedCommentIds = this.comments.filter(
    //   (comments,index)=>this.isCheckedItems[index]).map(
    //   (comment)=>comment.id);

    // if(checkedCommentIds.length === 0){
    //   alert("No comments selected for deletion.");
    //   return;
    // }
}

/*
  * set initial value of all check box
  */
fillCheckedItems(){
  //this.isCheckedItems = new Array(this.comments.length).fill(false);
 }

/*
  * check or not all check box by master checkbox
  */
toggleAllCheckBoxes():void{
  this.isCheckedItems.fill(this.isAllChecked)
}

/*
* check or not individual and check or not master checkbox depends on individual check box
*/
toggleCheckBox(index: number,  event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const isChecked = inputElement.checked;
  this.isCheckedItems[index] = isChecked;
  this.isAllChecked = this.isCheckedItems.every((checked) => checked);
}
}