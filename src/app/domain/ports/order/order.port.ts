import { IOrder, ISearchOrder } from "../../models/order.interface";
import { OrderDTO } from "./order.dto";

export interface OrderPort {
    deleteOrder(id: number): Promise<void>;
    listOrderPerDate(rangeDateSearch: ISearchOrder): Promise<OrderDTO[]>;
    registerOrder(order: IOrder): Promise<number>;
    updateOrderState(orderId: number, stateId: number): Promise<void>;
}