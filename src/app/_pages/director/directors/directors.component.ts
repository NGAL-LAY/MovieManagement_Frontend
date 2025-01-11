import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { DirectorService } from '../../../_services/director.service';
import { ConstantService } from '../../../_shared/constant/constant.service';

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
  // select director id
  selectedDirectorIds: number[] = [];

  constructor(
    private router: Router,
    private directorService: DirectorService,
    private constantService: ConstantService
  ) { }

  ngOnInit(): void {
    this.getAllDirectors();
  }

  /*
  * fetch all directors
  */
  getAllDirectors() {
    this.directorService.getAllDirectors().subscribe(
      (data) => {
        this.directors = data;
        this.fillCheckedItems();
      }, (error) => {
        console.log('Error fetched:', error);
      }
    );
  }

  /*
  * new director to route director-details
  */
  onNewDirector() {
    this.directorDetails = null;
    this.constantService.setObject(this.directorDetails);
    this.router.navigate(['/directors/director-details']);
  }

  /*
  * edit director to route director-details
  */
  onEditDirector() {
    const editDirectorId = this.selectedDirectorIds[0];
    this.directorDetails = this.directors.find(director => director.id === editDirectorId);
    if (this.directorDetails != null) {
      this.constantService.setObject(this.directorDetails);
      this.router.navigate(['/directors/director-details']);
    }
  }

  /*
  *seach function
  */
  onSearch(name: string) {
    if (!name) {
      this.getAllDirectors();
    } else {
      this.directorService.getAllDirectors().subscribe(
        (response) => {
          this.directors = response.filter(
            (data: any) => data.name.toLowerCase().includes(name.toLowerCase()));
        }
      );
    }
  }

  /*
  *delete comment
  */
  onDelete() {
    // checked directors
    const checkedDirectorIds = this.directors.filter(
      (directors, index) => this.isCheckedItems[index]).map(
        (director) => director.id);

    if (checkedDirectorIds.length === 0) {
      alert("No directors selected for deletion.");
      return;
    }

    // call director service
    this.directorService.deleteDirectorByIds(checkedDirectorIds).subscribe(
      (response) => {
        // 
        this.directors = this.directors.filter(
          (director, index) => !this.isCheckedItems[index]
        );
        this.fillCheckedItems();
        alert("Director delete successfully");
      }, (error) => {
        alert("Director delete Error");
      }
    )
  }

  /*
  * set initial value of all check box
  */
  fillCheckedItems() {
    this.isCheckedItems = new Array(this.directors.length).fill(false);
  }

  /*
  * check or not all check box by master checkbox
  */
  toggleAllCheckBoxes(): void {
    this.isCheckedItems.fill(this.isAllChecked);
    // handle of edit button
    if (!this.isAllChecked) {
      this.selectedDirectorIds = [];
    } else {
      this.selectedDirectorIds = this.directors.map(director => director.id);
    }
  }

  /*
  * check or not individual and check or not master checkbox depends on individual check box
  */
  toggleCheckBox(index: number, directorId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    //get checked id
    if (isChecked) {
      this.selectedDirectorIds.push(directorId);
    } else {
      this.selectedDirectorIds = this.selectedDirectorIds.filter(id => id !== directorId);
    }
    this.isCheckedItems[index] = isChecked;
    this.isAllChecked = this.isCheckedItems.every((checked) => checked);
  }

  /**
   * @returns false
   */
  isDisabled(): boolean {
    return this.selectedDirectorIds.length === 1 && !this.isAllChecked;
  }
}