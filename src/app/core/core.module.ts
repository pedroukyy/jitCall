import { NgModule } from '@angular/core';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';
import { AuthService } from './services/auth.service';
import { NotificacionService } from './services/notificacion.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ], providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    UsuarioService,
    AuthService,
    NotificacionService
  ]
})
export class CoreModule { }
