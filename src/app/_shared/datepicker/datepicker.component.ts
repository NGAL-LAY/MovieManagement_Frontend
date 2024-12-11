import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
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
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
    DatePipe
  ]
  // Include DatePipe in providers
})
export class DatepickerComponent implements ControlValueAccessor {
  value: any = '';
  @Output() dateChange = new EventEmitter<any>();

  constructor(private datePipe: DatePipe) {}

  // Callback function to be called when the form value changes
  onChange: any = () => { };
  onTouched: any = () => { };

  // Write the value to the component
  writeValue(value: any): void {
    if (value) {
      // Format the date when writing the value
      this.value = this.datePipe.transform(value, 'yyyy-MM-dd')!;
    }
  }

  // Register the function to be called when the value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register the function to be called when the input is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Custom method to handle value change (this could be tied to a date picker input)
  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;  // Type casting to HTMLInputElement
    this.value = inputElement.value;
    this.onChange(this.value);  // Notify Angular forms of the change
    this.dateChange.emit(this.value);  // Notify Angular forms of the change
  }
}