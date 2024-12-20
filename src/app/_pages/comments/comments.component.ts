import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../_shared/header/header.component';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../_services/comment.service';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{

  // store all comments
  comments: any[] = [];
  // check or not all checkboxes
  isAllChecked: boolean = false;
  // check or not individual checkbox
  isCheckedItems: boolean[] = [];

  constructor(
      private router: Router,
      private commentService: CommentService
    )
    {}

  ngOnInit(): void {
    this.getAllComments();
  }

  /*
  * set initial value of all check box
  */
 fillCheckedItems(){
  this.isCheckedItems = new Array(this.comments.length).fill(false);
 }

  /*
  * fetch all comments
  */
  getAllComments(){
    this.commentService.getAllComments().subscribe(
      (data)=> {
          this.comments = data;
          this.fillCheckedItems();
      },(error)=>{
        console.log('Error fetched:',error);
      }
    );
  }

  /*
  *seach function
  */
  onSearch(name: string){
    if(!name){
      this.getAllComments();
    }else{
      this.commentService.getAllComments().subscribe(
        (response)=>{
          this.comments = response.filter(
            (data:any)=> data.comments.toLowerCase().includes(name.toLowerCase()));
        }
      );
    }
  }

  /*
  * register new comment
  */
  onNewComment(){

  }

  /*
  *delete comment
  */
  onDelete(){
    // checked comments
    const checkedCommentIds = this.comments.filter(
      (comments,index)=>this.isCheckedItems[index]).map(
      (comment)=>comment.id);

    if(checkedCommentIds.length === 0){
      alert("No comments selected for deletion.");
      return;
    }

    // call comment service
    this.commentService.deleteCommentByIds(checkedCommentIds).subscribe(
      (response)=> {
        // 
        this.comments = this.comments.filter(
          (comment,index)=> !this.isCheckedItems[index]
        );
        this.fillCheckedItems();
        alert("Comments delete successfully");
      },(error)=>{
        alert("Comments delete Error");
      }
    )
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
