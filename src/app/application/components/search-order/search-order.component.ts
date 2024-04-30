import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ISearchOrder } from '../../../domain/models/order.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-search-order',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './search-order.component.html',
  styleUrl: './search-order.component.scss'
})
export class SearchOrderComponent {
  rangeDate: FormGroup = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required)
  });
  @Output() searchOrderInformation: EventEmitter<ISearchOrder> = new EventEmitter<ISearchOrder>();

  searchOrder(): void {
    this.rangeDate.value.start = (this.rangeDate.value.start as Date).getTime() / 1000;
    this.rangeDate.value.end = (this.rangeDate.value.end as Date).getTime() / 1000;
    this.searchOrderInformation.emit(this.rangeDate.value);
  }
}
