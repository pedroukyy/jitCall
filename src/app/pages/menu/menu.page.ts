import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/entities/usuario.entity';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  public user!: Usuario;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  async ngOnInit() {
    let uid = this.authService.getUID();
    if (uid){
      const u = await this.usuarioService.find(uid);
      if (u) this.user = u;
    }
  }

}
