import { Injectable } from "@angular/core";
import { Endpoints } from "../../domain/enum/endpoints.enum";
import { Observable } from "../../domain/mask/observable.mask";
import { IOrder, ISearchOrder } from "../../domain/models/order.interface";
import { OrderDTO } from "../../domain/ports/order/order.dto";
import { OrderPort } from "../../domain/ports/order/order.port";
import { HttpMask } from "./http.mask";
@Injectable({
  providedIn: 'root'
})
export class OrderAdapter implements OrderPort {
    private readonly http: HttpMask = new HttpMask();
    deleteOrder(id: number): Observable<void> {
        return this.http.delete(Endpoints.DELETE_ORDER + '/' + id);
    }

    listOrderPerDate(rangeDateSearch: ISearchOrder): Observable<OrderDTO[]> {
        return this.http.get(Endpoints.GET_ORDER + '/' + rangeDateSearch.start + '/' + rangeDateSearch.end);
    }

    registerOrder(order: IOrder): Observable<number> {
        return this.http.post(Endpoints.REGISTER_ORDER, order)
    }

    updateOrderState(orderId: number, stateId: number): Observable<void> {
        return this.http.patch(Endpoints.UPDATE_STATE + '/' + orderId, { stateId: stateId })
    }
}