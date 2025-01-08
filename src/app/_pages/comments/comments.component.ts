import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../_shared/header/header.component';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../_services/comment.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../_services/users.service';
import { MovieService } from '../../_services/movie.service';

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
export class CommentsComponent implements OnInit {

  // store all comments
  comments: any[] = [];
  // store all movies
  movies: any[] = [];
  // store all users
  users: any[] = [];
  // check or not all checkboxes
  isAllChecked: boolean = false;
  // check or not individual checkbox
  isCheckedItems: boolean[] = [];

  constructor(
    private commentService: CommentService,
    private userService: UsersService,
    private movieService: MovieService
  ) { }

  async ngOnInit() {
    await this.loadAllComments();
    this.convertIdToName();
  }

  /*
  * set initial value of all check box
  */
  fillCheckedItems() {
    this.isCheckedItems = new Array(this.comments.length).fill(false);
  }

  /*
 * Fetch all comments, users, and movies asynchronously
 */
  async loadAllComments() {
    try {
      // Wait for all promises to resolve
      const [comments, users, movies] = await Promise.all([
        this.commentService.getAllComments().toPromise(),
        this.userService.getAllUsers().toPromise(),
        this.movieService.getAllMovies().toPromise()
      ]);

      this.comments = comments;
      this.users = users;
      this.movies = movies;

      // Set initial state for checkboxes
      this.fillCheckedItems();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Convert ID values to names and update the comments
   */
  convertIdToName(): void {
    this.comments.forEach((comment) => {
      const movieName = this.movies.find((movie: any) => movie.id === comment.movieid)?.name;
      const userName = this.users.find((user: any) => user.id === comment.userid)?.name;

      comment.movieName = movieName;
      comment.userName = userName;
    });
  }

  private handleError(error: any): void {
    console.error('Error:', error);
  }

  /*
  *seach function
  */
  onSearch(name: string) {
    if (!name) {
      this.loadAllComments();
    } else {
      this.commentService.getAllComments().subscribe(
        (response) => {
          this.comments = response;
          this.convertIdToName();
          this.comments = response.filter(
            (data: any) => data.comments?.toLowerCase().includes(name.toLowerCase())
              || data.userName?.toLowerCase().includes(name.toLowerCase())
              || data.movieName?.toLowerCase().includes(name.toLowerCase()));
        }
      );
    }
  }

  /*
  *delete comment
  */
  onDelete() {
    // checked comments
    const checkedCommentIds = this.comments.filter(
      (comments, index) => this.isCheckedItems[index]).map(
        (comment) => comment.id);

    if (checkedCommentIds.length === 0) {
      alert("No comments selected for deletion.");
      return;
    }

    // call comment service
    this.commentService.deleteCommentByIds(checkedCommentIds).subscribe(
      (response) => {
        // 
        this.comments = this.comments.filter(
          (comment, index) => !this.isCheckedItems[index]
        );
        this.fillCheckedItems();
        alert("Comments delete successfully");
      }, (error) => {
        alert("Comments delete Error");
      }
    )
  }

  /*
  * check or not all check box by master checkbox
  */
  toggleAllCheckBoxes(): void {
    this.isCheckedItems.fill(this.isAllChecked)
  }

  /*
  * check or not individual and check or not master checkbox depends on individual check box
  */
  toggleCheckBox(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    this.isCheckedItems[index] = isChecked;
    this.isAllChecked = this.isCheckedItems.every((checked) => checked);
  }

}
