import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Contacto } from 'src/entities/contacto.entity';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
  standalone: false,
})
export class ContactosPage implements OnInit {
  contactos: Contacto[] = [];
  usuarioId: string | undefined;

  constructor(
    private contactoService: ContactoService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private notification: NotificacionService,
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

  async hacerLlamada(telefono: string | undefined) {
    if (telefono && this.usuarioId){
      const userFrom = await this.usuarioService.find(this.usuarioId);
      const user = await this.usuarioService.findPorContacto(telefono);

      if (user && userFrom){
        this.notification.notificar(user, userFrom);
      }

    }
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