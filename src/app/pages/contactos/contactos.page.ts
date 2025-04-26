import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Contacto } from 'src/entities/contacto.entity';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
  standalone: false,
})
export class ContactosPage implements OnInit {
  contactos: Contacto[] = [];
  userId: string = '';
  usuarioId: string | undefined;

  constructor(
    private contactoService: ContactoService,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.usuarioId = this.authService.getUID();
  }

  ngOnInit() {

    if (this.usuarioId) this.contactoService.findAll(this.usuarioId).subscribe({
      next: contactos => {
        this.contactos = contactos;
      }, error: e => {
        console.log(e);
      }
    });
  }

  async hacerLlamada(telefono: any) {
    window.open(`tel:${telefono}`, '_system');
  }

  async hacerVideoLlamada(telefono: any) {
    window.open(`https://meet.google.com/new?phone=${telefono}`, '_system');
  }

  async confirmarEliminacion(contactoId: string | undefined) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este contacto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarContacto(contactoId);
          }
        }
      ]
    });

    await alert.present();
  }

  async anadirContacto() {
    if (!this.userId) {
      console.error('UID no disponible');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Nuevo Contacto',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'telefono', type: 'tel', placeholder: 'Teléfono' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (!data.nombre || !data.telefono) {
              this.mostrarError('Por favor completa todos los campos');
              return false;
            }

            try {
              await this.validarYGuardarContacto(data);
              return true;
            } catch (error) {
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async validarYGuardarContacto(data: {nombre: string, telefono: string}) {
    this
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async eliminarContacto(contactoId: string | undefined) {
    if (this.usuarioId && contactoId) this.contactoService.remove(this.usuarioId, contactoId);
  }
}