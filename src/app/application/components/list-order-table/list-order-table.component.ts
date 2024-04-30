import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { OrderDTO } from '../../../domain/ports/order/order.dto';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-order-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DatePipe
  ],
  templateUrl: './list-order-table.component.html',
  styleUrl: './list-order-table.component.scss'
})
export class ListOrderTableComponent {
  displayedColumns: string[] = ['orderId', 'documentNumber', 'clientName', 'createdDate', 'total', 'state', 'acciones'];
  @Input({ required: true}) listOrder: OrderDTO[] = [];
  @Output() deleteOrderId: EventEmitter<number> = new EventEmitter<number>();
  @Output() cancelOrderId: EventEmitter<number> = new EventEmitter<number>();
  @Output() activateOrderId: EventEmitter<number> = new EventEmitter<number>();

  deleteOrder(id: number): void {
    this.deleteOrderId.emit(id);
  }

  cancelOrder(id: number): void {
    this.cancelOrderId.emit(id);
  }

  activateOrder(id: number): void {
    this.activateOrderId.emit(id);
  }
}
