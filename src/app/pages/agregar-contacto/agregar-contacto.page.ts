import { Component } from '@angular/core';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-contacto',
  templateUrl: './agregar-contacto.page.html',
  styleUrls: ['./agregar-contacto.page.scss'],
  standalone: false
})
export class AgregarContactoPage {

  nombre = '';
  telefono = '';
  usuarioId: string | undefined;

  constructor(
    private contactoService: ContactoService,
    private navController: NavController,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.usuarioId = this.authService.getUID();
  }

  async guardarContacto() {
    if (!this.validarCampos()) return;

    try {
      if (this.usuarioId) {
        await this.contactoService.insert(this.usuarioId, {
          nombre: this.nombre,
          telefono: this.telefono
        });
        this.mostrarAlerta('Éxito', 'Contacto guardado correctamente', 'success');
        this.navController.navigateBack('/contactos');
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudo guardar el contacto', 'danger');
    }
  }

  private validarCampos(): boolean {
    if (!this.nombre || !this.telefono) {
      this.mostrarAlerta('Error', 'Todos los campos son obligatorios', 'danger');
      return false;
    }
    
    if (!this.validarFormatoTelefono()) {
      this.mostrarAlerta('Error', 'Formato de teléfono inválido (9-15 dígitos)', 'danger');
      return false;
    }
    
    return true;
  }

  private validarFormatoTelefono(): boolean {
    const regex = /^[0-9]{9,15}$/;
    return regex.test(this.telefono);
  }

  private async mostrarAlerta(titulo: string, mensaje: string, color: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
      cssClass: `custom-alert-${color}`
    });
    await alert.present();
  }
}
