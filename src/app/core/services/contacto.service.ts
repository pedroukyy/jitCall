import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contacto } from 'src/entities/contacto.entity';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private firestore: Firestore) { }

  find(usuarioId: string, id: string){
    const collect = collection(this.firestore, `users/${+usuarioId}/contactos`);
    const entity = doc(collect, id);
  
    return getDoc(entity).then((snapshot) => snapshot.data()) as Promise<Contacto | undefined>;
  }

  public findAll(usuarioId: string) {

    const collect = collection(this.firestore, `users/${usuarioId}/contactos`);
		return collectionData(collect, {idField: 'id' as keyof Contacto}) as Observable<Contacto[]>;

	}

  async insert(usuarioId: string, user: Contacto){
    const collect = collection(this.firestore, `users/${usuarioId}/contactos`);
    await addDoc(collect, user);
  }
  
  async update(usuarioId: string, id: string, user: Partial<Contacto>){
    await updateDoc(doc(this.firestore, `users/${usuarioId}/contactos/${id}`), user);
  }

  async remove(usuarioId: string, id: string){
    await deleteDoc(doc(this.firestore, `users/${usuarioId}/contactos/${id}`));
  }

}
