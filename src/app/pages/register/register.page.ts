import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async register() {
    try {
      const pass = await this.authService.register({
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono
      }, this.email, this.password);

      if (pass) this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error durante el registro:', error);
      alert('Error: ' + error.message);
    }
  }
}
