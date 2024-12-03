import { Component, EventEmitter, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css',
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ] ,
   // Include DatePipe in providers
})
export class DatepickerComponent {
  @Output() dateChange = new EventEmitter<string>();
  selectedDate : Date | null = null;
  formattedDate : string  = "";

  constructor(
    private datepipe : DatePipe
  ){}



  // Method to format the date
  getFormattedDate(event: any) {
    this.formattedDate = this.datepipe.transform(this.selectedDate, 'yyyy/MM/dd') == null? "":(this.datepipe.transform(this.selectedDate, 'yyyy/MM/dd')+"");
    // When the date is selected, emit it:
    this.dateChange.emit(this.formattedDate);
  }
}