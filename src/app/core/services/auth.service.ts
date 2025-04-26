import { Injectable } from '@angular/core';
import {

	Auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
  onAuthStateChanged,
	signOut

} from '@angular/fire/auth';
import { UsuarioService } from './usuario.service';
import { NotificacionService } from './notificacion.service';
import { Usuario } from 'src/entities/usuario.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;

  constructor(private notification: NotificacionService, private usuarioService: UsuarioService, private auth: Auth, private http: HttpClient) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) this.setToken().subscribe({
        next: (token: any) => {
          this.token = token.data.access_token;
          localStorage.setItem('token', token.data.access_token);
        },
        error: e => {

        }
      })
    })
  }

  async login(email: string, password: string){
    const userFireauth = await signInWithEmailAndPassword(this.auth, email, password);
    if (userFireauth.user){

      const user = userFireauth.user;
      const token = await this.notification.init();
      if (token) this.usuarioService.update(user.uid, {token: token})
      
      return true;
    }
    return false;
  }

  async register(user: Usuario, email: string, password: string){
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user?.uid;
    if (uid){
      const token = await this.notification.init();
      user = {id: uid, ...user};
      if (token) user = {token: token, ...user}
      this.usuarioService.insert(user);
      return true;
    }
    return false;
  }

  async signout(){
    await signOut(this.auth);
  }

  private setToken(){
    return this.http.post('https://ravishing-courtesy-production.up.railway.app/user/login', {
      email: 'pedro.herrerabuelvas@unicolombo.edu.co',
      password: 'pedroherrera123'
    });
  }

  getToken(){
    return this.token;
  }

  getUID(){
    return this.auth.currentUser?.uid || undefined;
  }

}
