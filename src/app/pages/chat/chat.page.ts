import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore, collection, addDoc, collectionData, Timestamp } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false,
})
export class ChatPage implements OnInit {
  nuevoMensaje = '';
  mensajes: Observable<any[]> = of([]); // Inicialización con observable vacío
  usuarioId: string | undefined; // Cambiado a undefined para coincidir con getUID()

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    this.usuarioId = this.authService.getUID();
    if (this.usuarioId) {
      const chatRef = collection(this.firestore, 'chats');
      this.mensajes = collectionData(chatRef, { idField: 'id' });
    }
  }

  async enviarMensaje() {
    if (!this.nuevoMensaje.trim() || !this.usuarioId) return;

    const chatRef = collection(this.firestore, 'chats');
    await addDoc(chatRef, {
      texto: this.nuevoMensaje,
      usuarioId: this.usuarioId,
      fecha: Timestamp.now()
    });

    this.nuevoMensaje = '';
  }
}