import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent {
  productoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      nombre: [''],
      precio: [0],
    });
  }

  crearProducto() {
    console.log('Producto creado:', this.productoForm.value);
    // Lógica para guardar el producto
  }
}
