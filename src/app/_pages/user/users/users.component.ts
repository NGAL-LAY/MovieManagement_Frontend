import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../_services/users.service';
import { ConstantService } from '../../../_shared/constant/constant.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    UserDetailsComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  
  // to transfer userdetails
    userDetails: any;
    // store all users
    users: any[] = [];
    // check or not all checkboxes
    isAllChecked: boolean = false;
    // check or not individual checkbox
    isCheckedItems: boolean[] = [];
    // select user id
    selectedUserIds: number[] = [];
    
    constructor(
      private router: Router,
      private userService: UsersService,
      private constantService: ConstantService
    ) { }
    
    ngOnInit(): void {
      this.getAllUsers();
    }
    
  /*
  * fetch all users
  */
  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (data)=> {
          this.users = data;
          this.fillCheckedItems();
      },(error)=>{
        console.log('Error fetched:',error);
      }
    );
  }
    
  /*
  * new user to route user-details
  */
  onNewUser(){
    this.userDetails = [];
    this.constantService.setObject(this.userDetails);
    this.router.navigate(['/users/user-details']);
  }
  
  /*
  * edit user to route user-details
  */
  onEditUser(){
    const edituserId = this.selectedUserIds[0];
    this.userDetails = this.users.find(user => user.id === edituserId);
    if(this.userDetails != null){
      this.constantService.setObject(this.userDetails);
      this.router.navigate(['/users/user-details']);
    }
  }
    
  /*
   *seach function
   */
   onSearch(name: string){
    if(!name){
      this.getAllUsers();
    }else{
      this.userService.getAllUsers().subscribe(
        (response)=>{
          this.users = response.filter(
            (data:any)=> data.name.toLowerCase().includes(name.toLowerCase()));
        }
      );
    }
  }
    
  /*
   *delete user
   */
   onDelete(){
    // checked users
    const checkedUserIds = this.users.filter(
    (users, index) => this.isCheckedItems[index]).map(
      (user) => user.id);

    if (checkedUserIds.length === 0) {
      alert("No users selected for deletion.");
      return;
    }

  // call user service
  this.userService.deleteUserByIds(checkedUserIds).subscribe(
    (response) => {
      // 
      this.users = this.users.filter(
        (director, index) => !this.isCheckedItems[index]
      );
      this.fillCheckedItems();
      alert("User delete successfully");
      }, (error) => {
        alert("User delete Error");
      }
    )
  }
    
  /*
   * set initial value of all check box
   */
  fillCheckedItems(){
    this.isCheckedItems = new Array(this.users.length).fill(false);
  }
    
  /*
   * check or not all check box by master checkbox
   */
  toggleAllCheckBoxes():void{
    this.isCheckedItems.fill(this.isAllChecked);
    // handle of edit button
    if(!this.isAllChecked){
      this.selectedUserIds = [];
    }else{
      this.selectedUserIds = this.users.map(director => director.id);
    }
  }
    
  /*
   * check or not individual and check or not master checkbox depends on individual check box
   */
  toggleCheckBox(index: number, directorId: number,  event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    //get checked id
    if(isChecked){
      this.selectedUserIds.push(directorId);
    } else {
      this.selectedUserIds = this.selectedUserIds.filter(id => id !== directorId);
    }
    this.isCheckedItems[index] = isChecked;
    this.isAllChecked = this.isCheckedItems.every((checked) => checked);
  }
  
  /**
   * @returns false
   */
    isDisabled(): boolean {
      return this.selectedUserIds.length === 1 && !this.isAllChecked;
    }
  }
