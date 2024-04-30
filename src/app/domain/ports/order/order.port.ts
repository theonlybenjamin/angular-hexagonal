import { Observable } from "../../mask/observable.mask";
import { IOrder, ISearchOrder } from "../../models/order.interface";
import { OrderDTO } from "./order.dto";

export interface OrderPort {
    deleteOrder(id: number): Observable<void>;
    listOrderPerDate(rangeDateSearch: ISearchOrder): Observable<OrderDTO[]>;
    registerOrder(order: IOrder): Observable<number>;
    updateOrderState(orderId: number, stateId: number): Observable<void>;
}