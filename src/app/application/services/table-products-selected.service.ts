import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsTable } from '../../domain/models/product.interface';
import { ProductoDTO } from '../../domain/ports/products/product.dto';

@Injectable({
  providedIn: 'root'
})
export class TableProductsSelectedService {
  public productsSelected: BehaviorSubject<ProductsTable[]> = new BehaviorSubject<ProductsTable[]>([]);

  public addProductsToSelectedProdcuts(newProductSelected: ProductoDTO[]): void {
    const transformedProductsTable: ProductsTable[] = this.transformProductsDTOtoProductsTable(newProductSelected);
    const oldProductsAndNewProducts = this.productsSelected.getValue().concat(transformedProductsTable);
    this.productsSelected.next(this.deleteDuplicateProducts(oldProductsAndNewProducts));
  }

  private transformProductsDTOtoProductsTable(productsDTO: ProductoDTO[]): ProductsTable[] {
    const productsTable: ProductsTable[] = [];
    productsDTO.forEach(product => {
      const newProduct: ProductsTable = { ...product, quantity: 1, finalPrice: 0 };
      newProduct.finalPrice = newProduct.price * newProduct.quantity;
      productsTable.push(newProduct)
    });

    return productsTable;
  }

  private deleteDuplicateProducts(products: ProductsTable[]): ProductsTable[] {
    return products.filter(
      (productSelected, index, selfProductsSelectedArray) => index === selfProductsSelectedArray.findIndex(product => product.id === productSelected.id))

  }

  changeQuantityOfProduct(newValue: number, idOfProductoToChange: number): void {
    const productsSelected: ProductsTable[] = this.productsSelected.getValue();
    const indexToChange = productsSelected.findIndex(product => product.id === idOfProductoToChange);
    productsSelected[indexToChange].quantity = newValue;
    productsSelected[indexToChange].finalPrice = productsSelected[indexToChange].quantity * productsSelected[indexToChange].price;
    this.productsSelected.next(productsSelected);
  }
}
