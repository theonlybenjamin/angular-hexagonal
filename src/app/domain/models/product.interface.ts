import { ProductoDTO } from "../ports/products/product.dto";

export interface ProductsTable extends ProductoDTO {
    quantity: number;
    finalPrice: number;
  }