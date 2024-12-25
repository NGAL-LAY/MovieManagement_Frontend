import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import { CompanyService } from '../../../_services/company.service';
import { ConstantService } from '../../../_shared/constant/constant.service';

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
  // select companies id
  selectedCompanyIds: number[] = [];

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private constantService: ConstantService
  ) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  /*
   * fetch all companies
   */
  getAllCompanies() {
    this.companyService.getAllCompanies().subscribe(
      (data) => {
        this.companies = data;
        this.fillCheckedItems();
      }, (error) => {
        console.log('Error fetched:', error);
      }
    );
  }

  /*
   * new company to route company-details
   */
  onNewCompany() {
    this.companyDetails = [];
    this.constantService.setObject(this.companyDetails);
    this.router.navigate(['/companies/company-details']);
  }

  /*
   * edit company to route company-details
   */
  onEditCompany() {
    const editCompanyId = this.selectedCompanyIds[0];
    this.companyDetails = this.companies.find(company => company.id === editCompanyId);
    if (this.companyDetails != null) {
      this.constantService.setObject(this.companyDetails);
      this.router.navigate(['/companies/company-details']);
    }
  }

  /*
   *seach function
   */
  onSearch(name: string) {
    if (!name) {
      this.getAllCompanies();
    } else {
      this.companyService.getAllCompanies().subscribe(
        (response) => {
          this.companies = response.filter(
            (data: any) => data.name.toLowerCase().includes(name.toLowerCase()));
        }
      );
    }
  }

  /*
   *delete company
   */
  onDelete() {
    // checked comments
    const checkedCompanyIds = this.companies.filter(
      (comments, index) => this.isCheckedItems[index]).map(
        (comment) => comment.id);

    if (checkedCompanyIds.length === 0) {
      alert("No comments selected for deletion.");
      return;
    }

    // call company service
    this.companyService.deleteCompanyByIds(checkedCompanyIds).subscribe(
      (response) => {
        this.companies = this.companies.filter(
          (company, index) => !this.isCheckedItems[index]
        );
        this.fillCheckedItems();
        alert("Company delete successfully");
      }, (error) => {
        alert("Company delete Error");
      }
    )
  }

  /*
   * set initial value of all check box
   */
  fillCheckedItems() {
    this.isCheckedItems = new Array(this.companies.length).fill(false);
  }

  /*
   * check or not all check box by master checkbox
   */
  toggleAllCheckBoxes(): void {
    this.isCheckedItems.fill(this.isAllChecked);
    // handle of edit button
    if (!this.isAllChecked) {
      this.selectedCompanyIds = [];
    } else {
      this.selectedCompanyIds = this.companies.map(company => company.id);
    }
  }

  /*
  * check or not individual and check or not master checkbox depends on individual check box
  */
  toggleCheckBox(index: number, companyId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    //get checked id
    if (isChecked) {
      this.selectedCompanyIds.push(companyId);
    } else {
      this.selectedCompanyIds = this.selectedCompanyIds.filter(id => id !== companyId);
    }
    this.isCheckedItems[index] = isChecked;
    this.isAllChecked = this.isCheckedItems.every((checked) => checked);
  }

  /**
    * @returns false
    */
  isDisabled(): boolean {
    return this.selectedCompanyIds.length === 1 && !this.isAllChecked;
  }
}
