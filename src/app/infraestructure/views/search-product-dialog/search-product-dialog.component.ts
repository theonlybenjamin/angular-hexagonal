import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductAdapter } from '../../http/product.adapter';
import { ProductoDTO } from '../../../domain/ports/products/product.dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TableProductsSelectedService } from '../../../application/services/table-products-selected.service';

@Component({
  selector: 'app-search-product-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatCheckboxModule, MatTableModule, MatInputModule, FormsModule],
  templateUrl: './search-product-dialog.component.html',
  styleUrl: './search-product-dialog.component.scss'
})
export class SearchProductDialogComponent {
  private productAdapter: ProductAdapter = inject(ProductAdapter);
  private tableProductsSelected: TableProductsSelectedService = inject(TableProductsSelectedService);
  public productsResultList: MatTableDataSource<ProductoDTO> = new MatTableDataSource<ProductoDTO>;
  public displayedColumns: string[] = ['select','id', 'name', 'price'];
  public productName: string = '';
  public selection = new SelectionModel<ProductoDTO>(true, []);

  searchProductoByName(): void {
    this.productAdapter.getProductsByCoincidence(this.productName).subscribe(
      products => this.productsResultList.data = products
    );
  }

  saveSelectedProducts(): void {
    this.tableProductsSelected.addProductsToSelectedProdcuts(this.selection.selected);
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.productsResultList.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productsResultList.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: ProductoDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
