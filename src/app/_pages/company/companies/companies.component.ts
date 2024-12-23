import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import { CompanyService } from '../../../_services/company.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    CompanyDetailsComponent
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit {

  // to transfer companydetails
  companyDetails: any;
  // store all companiess
  companies: any[] = [];
  // check or not all checkboxes
  isAllChecked: boolean = false;
  // check or not individual checkbox
  isCheckedItems: boolean[] = [];

  constructor(
    private router: Router,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  /*
   * fetch all companies
   */
  getAllCompanies() {
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
    * new company to route company-details
    */
  onNewCompany() {
    this.companyDetails = [];
    this.router.navigate(['/companies/company-details']);
  }

  /*
    *seach function
    */
  onSearch(name: string) {
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
  *delete company
  */
  onDelete() {
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
  fillCheckedItems() {
    //this.isCheckedItems = new Array(this.comments.length).fill(false);
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
