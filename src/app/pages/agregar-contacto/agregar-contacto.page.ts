import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/core/services/contacto.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-agregar-contacto',
  templateUrl: './agregar-contacto.page.html',
  styleUrls: ['./agregar-contacto.page.scss'],
  standalone: false
})
export class AgregarContactoPage implements OnInit {

  nombre = '';
  telefono = '';
  usuarioId: string | undefined;
  constructor(private contactoService: ContactoService, private navController: NavController, private authService: AuthService) {
    this.usuarioId = this.authService.getUID();
  }

  ngOnInit() {
  }

  guardarContacto() {
    if (this.usuarioId){
      this.contactoService.insert(this.usuarioId, {nombre: this.nombre, telefono: this.telefono});
      this.navController.navigateBack('/contactos');
    }
  }

}
