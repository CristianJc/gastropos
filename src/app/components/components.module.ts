import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MenuComponent } from "./menu/menu.component";
import { CompletedOrdersComponent } from "./completed-orders/completed-orders.component";
import { FacturaListComponent } from "./factura-list/factura-list.component";
import { InventorioComponent } from "./inventorio/inventorio.component";
import { InventoryFormComponent } from "./inventory-form/inventory-form.component";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { InventoryUpdateModalComponent } from "./inventory-update-modal/inventory-update-modal.component";
import { LoginComponent } from "./login/login.component";
import { MesasComponent } from "./mesas/mesas.component";
import { OrdersComponent } from "./ordenes/orders.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderListAltComponent } from "./order-list-alt/order-list-alt.component";
import { PedidoComponent } from "./pedido/pedido.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductoComponent } from "./producto/producto.component";
import { ReceiptPreviewComponent } from "./receipt-preview/receipt-preview.component";
import { SalesReportsComponent } from "./sales-reports/sales-reports.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MesasComponent,
    ProductoComponent,
    PedidoComponent,
    OrdersComponent,
    LoginComponent,
    ProductListComponent,
    ProductFormComponent,
    InventoryListComponent,
    InventoryFormComponent,
    InventoryUpdateModalComponent,
    InventorioComponent,
    OrderListAltComponent,
    OrderDetailComponent,
    CompletedOrdersComponent,
    ReceiptPreviewComponent,
    FacturaListComponent,
    SalesReportsComponent,
    NavbarComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MesasComponent,
    ProductoComponent,
    PedidoComponent,
    OrdersComponent,
    LoginComponent,
    ProductListComponent,
    ProductFormComponent,
    InventoryListComponent,
    InventoryFormComponent,
    InventoryUpdateModalComponent,
    InventorioComponent,
    OrderListAltComponent,
    OrderDetailComponent,
    CompletedOrdersComponent,
    ReceiptPreviewComponent,
    FacturaListComponent,
    SalesReportsComponent,
    NavbarComponent,
  ],
})
export class ComponentsModule {}
