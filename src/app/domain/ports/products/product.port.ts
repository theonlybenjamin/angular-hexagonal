import { Observable } from "../../mask/observable.mask";
import { ProductoDTO } from "./product.dto";

export interface ProductPort {
    getProductsByCoincidence(productName: string): Observable<ProductoDTO[]>;
}