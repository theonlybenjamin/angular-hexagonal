import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DocumentTypesDTO } from '../../../domain/ports/types-document/document-types.dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IOrder } from '../../../domain/models/order.interface';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-register-order-inputs',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatRadioModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './register-order-inputs.component.html',
  styleUrl: './register-order-inputs.component.scss'
})
export class RegisterOrderInputsComponent {
  @Input({ required: true}) documentTypes!: DocumentTypesDTO[];
  @Output() openSearchProductDialogEvent: EventEmitter<void> = new EventEmitter();
  @Output() registerOrderEvent: EventEmitter<IOrder> = new EventEmitter();
  public registForm: FormGroup = new FormGroup({
    clientName: new FormControl('', Validators.required),
    documentTypeId: new FormControl('', Validators.required),
    documentNumber: new FormControl('', Validators.required),
    registerDate: new FormControl('', Validators.required),
    receiptType: new FormControl('', Validators.required)
  });


  openSearchProductDialog(): void {
    this.openSearchProductDialogEvent.emit();
  }

  registerOrder(): void {
    this.registerOrderEvent.emit(this.registForm.value);
  }
}
