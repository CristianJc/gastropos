import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === 'password') {
      // Simulación de autenticación
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
