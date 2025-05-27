import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertController } from '@ionic/angular';

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
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
    this.submitted = true;
    
    if (!this.validatePhone()) {
      await this.showErrorAlert('El teléfono debe tener entre 9 y 15 dígitos');
      return;
    }

    try {
      const result = await this.authService.register({
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono
      }, this.email, this.password);

      if (result) {
        await this.showSuccessAlert();
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      console.error('Error durante el registro:', error);
      this.handleError(error);
    }
  }

  private validatePhone(): boolean {
    const phoneRegex = /^[0-9]{9,15}$/;
    return phoneRegex.test(this.telefono);
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  private async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: '¡Bienvenido a jitCall!',
      buttons: ['OK'],
      cssClass: 'custom-alert-success'
    });
    await alert.present();
  }

  private handleError(error: any) {
    let errorMessage = 'Error desconocido';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'El email ya está registrado';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
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
}
