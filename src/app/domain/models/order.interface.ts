export interface IOrderDetail {
    productId: number;
    quantity: number;
    unitPrice: number;
}
export interface IOrder {
    clientName: string;
    documentTypeId: number;
    documentNumber: string;
    registerDate: string;
    receiptType: number;
    subTotal: number;
    igv: number;
    total: number;
    orderDetail: IOrderDetail[];
}

export interface ISearchOrder {
    start: string
    end: string
}