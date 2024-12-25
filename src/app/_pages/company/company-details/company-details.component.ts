import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DatepickerComponent } from '../../../_shared/datepicker/datepicker.component';
import { CompanyService, Company } from '../../../_services/company.service';
import { ConstantService } from '../../../_shared/constant/constant.service';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    DatepickerComponent
  ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent implements OnInit{
  
  // company details from parent company
  @Input() companyDetails: any;
  companyForm!: FormGroup;
  // edit status
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private constantService: ConstantService
  ) { }

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern(/^[A-Za-z][A-Za-z0-9\s]*$/)
      ]),
      releaseMovies: new FormControl('', [
        Validators.required
      ]),
      country: new FormControl('', [
        Validators.required
      ]),
      openDate: new FormControl('', [
        Validators.required
      ]),
    });

    // company details set by shared service
    this.constantService.currentData.subscribe((company) => {
      this.companyDetails = company;
    });

    // Dynamically set values
    if (this.companyDetails?.name) {
      this.isEdit = true;
      this.companyForm.patchValue({
        name: this.companyDetails.name,
        releaseMovies: this.companyDetails.releaseMovies,
        country: this.companyDetails.country,
        openDate: this.companyDetails.openDate
      });
    }
  }

  /*
   *new company register  
   */
  onRegister() {
    const Company: Company = {
      name: this.companyForm.value.name || '',  
      releaseMovies: this.companyForm.value.releaseMovies || '', 
      country: this.companyForm.value.country || '',  
      openDate: this.companyForm.value.openDate || ''
    };
    this.companyService.registerCompany(Company).subscribe(
      (response) => {
        this.router.navigate(['/companies']);
      }, (error) => {
        this.router.navigate(['/404'])
      }
    );
  }

  /*
   *company update  
   */
  onUpdate() {
    const company: Company = {
      name: this.companyForm.value.name || '',  
      releaseMovies: this.companyForm.value.releaseMovies || '', 
      country: this.companyForm.value.country || '',  
      openDate: this.companyForm.value.openDate || ''
    };
    this.companyService.updateCompany(this.companyDetails.id, company).subscribe(
      (response) => {
        this.router.navigate(['/companies']);
      }, (error) => {
        this.router.navigate(['/404'])
      }
    );
  }
}