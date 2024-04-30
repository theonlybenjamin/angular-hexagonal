import { Component, Inject, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { DocumentTypesAdapter } from '../../http/document-types.adapter';
import { DocumentTypesDTO } from '../../../domain/ports/types-document/document-types.dto';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RegisterOrderInputsComponent } from '../../../application/components/register-order-inputs/register-order-inputs.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchProductDialogComponent } from '../search-product-dialog/search-product-dialog.component';
import { TableProductsSelectedService } from '../../../application/services/table-products-selected.service';
import { ProductsTable } from '../../../domain/models/product.interface';
import { MatCardModule } from '@angular/material/card';
import { IOrder, IOrderDetail } from '../../../domain/models/order.interface';
import { Router } from '@angular/router';
import { OrderPort } from '../../../domain/ports/order/order.port';
import { ORDER_PORT_TOKEN } from '../../../app.config';

@Component({
  selector: 'app-register-order',
  standalone: true,
  imports: [RegisterOrderInputsComponent, MatButtonModule, MatTableModule, MatInputModule, MatDialogModule, MatCardModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './register-order.component.html',
  styleUrl: './register-order.component.scss'
})
export class RegisterOrderComponent {
  @ViewChild(RegisterOrderInputsComponent) registerOrderInputsComponent!: RegisterOrderInputsComponent;
  public displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'finalPrice'];
  public selectedProducts: ProductsTable[] = [];
  public documentTypes: DocumentTypesDTO[] = [];
  public subtotal: number = 0;
  public igv: number = 0;
  public total: number = 0;
  constructor(
    private documentTypeAdapter: DocumentTypesAdapter,
    public dialogMaterial: MatDialog,
    public tableProductsSelected: TableProductsSelectedService,
    @Inject(ORDER_PORT_TOKEN) public orderAdapter: OrderPort,
    public router: Router
  ) {
    this.getTypesOfDocuments();
    this.calculatePaymentValues();
    this.tableProductsSelected.productsSelected
      .subscribe(products => {
        this.selectedProducts = products;
        this.calculatePaymentValues();
      });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  getTypesOfDocuments(): void {
    this.documentTypeAdapter.getTypesOfDocuments().subscribe(documentTypes => this.documentTypes = documentTypes);
  }

  openSearchProductDialog(): void {
    this.dialogMaterial.open(SearchProductDialogComponent);
  }

  calculatePaymentValues(): void {
    this.subtotal = 0;
    this.selectedProducts.map(product => this.subtotal += product.finalPrice);
    this.igv = Number((this.subtotal * 0.18).toFixed(2));
    this.total = this.subtotal + this.igv;
  }

  registerOrder(): void {
    const order: IOrder = {
      ...this.registerOrderInputsComponent.registForm.value,
      subtotal: this.subtotal,
      igv: this.igv,
      total: this.total,
      orderDetail: this.changeAllSelectedProduct(this.selectedProducts)
    }
    order.registerDate = new Date(order.registerDate).toISOString()
    this.orderAdapter.registerOrder(order).subscribe(() => this.reloadRoute());
  }

  reloadRoute(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/dashboard/registrar-orden']));
  }
  private changeAllSelectedProduct(selectedProducts: ProductsTable[]) {
    const orderDetails: IOrderDetail[] = selectedProducts.map(selectedProduct => this.selectedProductsAdapter(selectedProduct));
    return orderDetails;
  }

  private selectedProductsAdapter(selectedProducts: ProductsTable) {
    const orderDetail: IOrderDetail = {
      productId: selectedProducts.id,
      quantity: selectedProducts.quantity,
      unitPrice: selectedProducts.price
    }

    return orderDetail;
  }

}
