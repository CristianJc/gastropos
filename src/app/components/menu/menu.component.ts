import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
interface MenuItem {
  icon: string;
  name: string;
  link: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0, width: '0px' })),
      transition('in => out', animate('200ms ease-out')),
      transition('out => in', animate('200ms ease-in')),
    ]),
  ],
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  isExpanded = true;
  isCollapsed = false;
  menuItems: MenuItem[] = [
    { icon: 'fas fa-th-large', name: 'Mesas', link: '/mesas' },
    { icon: 'fas fa-laptop', name: 'Ordenes', link: '/ordenes' },
    { icon: 'fas fa-chart-bar', name: 'Producto', link: '/producto' },
    { icon: 'fas fa-chart-bar', name: 'Inventario', link: '/inventario' },
    {
      icon: 'fas fa-puzzle-piece',
      name: 'Ordenes Completas',
      link: '/completed-orders',
    },
    { icon: 'fas fa-cog', name: 'Factura', link: '/factura' },
    { icon: 'fas fa-cog', name: 'Peporte', link: '/reporte' },
    // { icon: 'fas fa-table', name: 'Table', link: '/table' },
    // { icon: 'fas fa-file', name: 'Pages', link: '/pages' },
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }
}
