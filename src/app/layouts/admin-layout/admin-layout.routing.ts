import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { MesasComponent } from "app/components/mesas/mesas.component";
import { OrdersComponent } from "app/components/ordenes/orders.component";
import { ProductoComponent } from "app/components/producto/producto.component";
import { InventorioComponent } from "app/components/inventorio/inventorio.component";
import { CompletedOrdersComponent } from "app/components/completed-orders/completed-orders.component";
import { FacturaListComponent } from "app/components/factura-list/factura-list.component";
import { NavbarComponent } from "app/components/navbar/navbar.component";
import { OrderListAltComponent } from "app/components/order-list-alt/order-list-alt.component";
import { SalesReportsComponent } from "app/components/sales-reports/sales-reports.component";
import { OrderDetailComponent } from "app/components/order-detail/order-detail.component";

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "table-list", component: TableListComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "mesas", component: MesasComponent },
  { path: "ordenes", component: OrdersComponent },
  { path: "producto", component: ProductoComponent },
  { path: "inventario", component: InventorioComponent },
  {
    path: "completed-orders",
    component: CompletedOrdersComponent,
  },
  {
    path: "factura",
    component: FacturaListComponent,
  },
  {
    path: "navbar",
    component: NavbarComponent,
  },

  { path: "orders", component: OrderListAltComponent },
  { path: "reporte", component: SalesReportsComponent },
  { path: "orders/:id", component: OrderDetailComponent },
  { path: "", redirectTo: "/mesas", pathMatch: "full" },
];
