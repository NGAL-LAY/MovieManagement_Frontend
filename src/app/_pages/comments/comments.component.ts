import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../_shared/header/header.component';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{

  constructor(
      private router: Router
    )
    {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /*
  *seach function
  */
  onSearch(name: string){
    // if(name){
    //   this.getMovieByName(name);
    // }else{
    //   this.getAllMovies();
    // }
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
  
  }

  /*
  * all check or not
  */
  toggleAllCheckBoxes(){
  
  }

  /*
  * check or not
  */
  toggleCheckBox(){
  
  }

}
