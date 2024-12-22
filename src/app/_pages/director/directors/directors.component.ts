import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { DirectorService } from '../../../_services/director.service';

@Component({
  selector: 'app-directors',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    DirectorDetailsComponent
  ],
  templateUrl: './directors.component.html',
  styleUrl: './directors.component.css'
})
export class DirectorsComponent implements OnInit {
  
  // to transfer directordetails
    directorDetails: any;
    // store all directors
    directors: any[] = [];
    // check or not all checkboxes
    isAllChecked: boolean = false;
    // check or not individual checkbox
    isCheckedItems: boolean[] = [];
  
    constructor(
      private router: Router,
      private directorService: DirectorService
    ) { }
  
    ngOnInit(): void {
      this.getAllDirectors();
    }
  
   /*
    * fetch all directors
    */
   getAllDirectors(){
    // this.actorService.getAllActors().subscribe(
    //   (data)=> {
    //       this.actors = data;
    //       this.fillCheckedItems();
    //   },(error)=>{
    //     console.log('Error fetched:',error);
    //   }
    // );
  }
  
  /*
    * new actor to route actor-details
    */
  onNewDirector(){
    this.directorDetails = [];
    this.router.navigate(['/directors/director-details']);
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
