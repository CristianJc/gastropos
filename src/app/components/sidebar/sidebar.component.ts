import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/mesas", title: "Mesas", icon: "dashboard", class: "" },
  { path: "/ordenes", title: "Ordenes", icon: "person", class: "" },
  {
    path: "/producto",
    title: "Producto",
    icon: "content_paste",
    class: "",
  },
  {
    path: "/inventario",
    title: "Inventario",
    icon: "library_books",
    class: "",
  },
  {
    path: "/completed-orders",
    title: "Ordenes Completadas",
    icon: "bubble_chart",
    class: "",
  },
  { path: "/factura", title: "Factura", icon: "location_on", class: "" },
  {
    path: "/reporte",
    title: "Reporte",
    icon: "notifications",
    class: "",
  },
  // {
  //   path: "/upgrade",
  //   title: "Upgrade to PRO",
  //   icon: "unarchive",
  //   class: "active-pro",
  // },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
