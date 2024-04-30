import { Injectable, inject } from "@angular/core";
import { Endpoints } from "../../domain/enum/endpoints.enum";
import { ProductoDTO } from "../../domain/ports/products/product.dto";
import { ProductPort } from "../../domain/ports/products/product.port";
import { HttpMask } from "./http.mask";

@Injectable({
    providedIn: 'root'
})
export class ProductAdapter implements ProductPort {
    private readonly http: HttpMask = inject(HttpMask);

    getProductsByCoincidence(productName: string): Promise<ProductoDTO[]> {
        return this.http.get<ProductoDTO[]>(Endpoints.GET_PRODUCTS + '/' + productName);
    };
}