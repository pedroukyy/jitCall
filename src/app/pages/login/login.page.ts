import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    this.submitted = true;
    
    try {
      const result = await this.authService.login(this.email, this.password);
      if (result) {
        await this.showSuccessAlert();
        this.router.navigate(['/menu']);
      }
    } catch (error: any) {
      console.error('Error en login:', error);
      this.handleError(error);
    }
  }

  private async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: '¡Has iniciado sesión correctamente!',
      buttons: ['OK'],
      cssClass: 'custom-alert-success',
      backdropDismiss: false
    });
    await alert.present();
  }

  private handleError(error: any) {
    let errorMessage = 'Error desconocido';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuario no registrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }
    }
    
    this.showErrorAlert(errorMessage);
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert',
      backdropDismiss: true
    });
    await alert.present();
  }
}