import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Para mostrar mensajes al usuario
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    try {
      const pass = await this.authService.login(this.email, this.password);
      if (pass) this.router.navigate(['/menu']); // O donde tengas tu página principal
    } catch (error: any) {
      console.error('Error en login:', error);
      this.presentToast('Error: ' + (error.message || 'No se pudo iniciar sesión'));
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'primary',
    });
    toast.present();
  }
}
