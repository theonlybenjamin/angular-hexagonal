import { Component, Inject } from '@angular/core';
import { SearchOrderComponent } from '../../../application/components/search-order/search-order.component';
import { ORDER_PORT_TOKEN } from '../../../app.config';
import { OrderPort } from '../../../domain/ports/order/order.port';
import { ISearchOrder } from '../../../domain/models/order.interface';
import { ListOrderTableComponent } from '../../../application/components/list-order-table/list-order-table.component';
import { OrderDTO } from '../../../domain/ports/order/order.dto';
import { concatMap, tap } from 'rxjs';
import { Observable } from '../../../domain/mask/observable.mask';

@Component({
  selector: 'app-list-order',
  standalone: true,
  imports: [
    SearchOrderComponent,
    ListOrderTableComponent
  ],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.scss'
})
export class ListOrderComponent {
  public listOrdeSearchResult: OrderDTO[] = [];
  private lastSearchRangeInformation: ISearchOrder = { start: '', end: ''};

  constructor(@Inject(ORDER_PORT_TOKEN) private orderPort: OrderPort) { }

  searchOrder(searchRangeInformation: ISearchOrder): void {
    this.lastSearchRangeInformation = searchRangeInformation;
    this.executeListOrdeSearch(searchRangeInformation).subscribe();
  }

  private executeListOrdeSearch(searchRangeInformation: ISearchOrder): Observable<OrderDTO[]> {
    return this.orderPort.listOrderPerDate(searchRangeInformation).pipe(tap(result => this.listOrdeSearchResult = result));
  }

  cancelOrder(id: number): void {
    this.orderPort.updateOrderState(id, 2)
    .pipe(
      concatMap(() => this.executeListOrdeSearch(this.lastSearchRangeInformation))
    ).subscribe();
  }

  deleteOrder(id: number): void {
    this.orderPort.deleteOrder(id).pipe(
      concatMap(() => this.executeListOrdeSearch(this.lastSearchRangeInformation))
    ).subscribe();
  }

  activateOrder(id: number): void {
    this.orderPort.updateOrderState(id, 1)
    .pipe(
      concatMap(() => this.executeListOrdeSearch(this.lastSearchRangeInformation))
    ).subscribe();
  }
}
