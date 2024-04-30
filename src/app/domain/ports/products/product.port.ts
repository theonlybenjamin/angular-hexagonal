import { ProductoDTO } from "./product.dto";

export abstract class ProductPort {
    abstract getProductsByCoincidence(productName: string): Promise<ProductoDTO[]>;
}