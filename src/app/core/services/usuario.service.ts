import { Injectable } from '@angular/core';
import { Usuario } from 'src/entities/usuario.entity';

import { Firestore, collection, updateDoc, doc, setDoc, getDoc, getDocs, query, where, limit } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: Firestore) { }

  find(id: string){
    const collect = collection(this.firestore, 'users');
    const entity = doc(collect, id);

    return getDoc(entity).then((snapshot) => snapshot.data()) as Promise<Usuario | undefined>;
  }

  public findPorContacto(telefono: string){

		return getDocs(query(collection(this.firestore, `users`), where('telefono', '==', telefono), limit(1))).then((snapshot) => {
			if (snapshot.empty) return undefined;
			return {id: snapshot.docs[0].id, ...snapshot.docs[0].data()} as Usuario;
		}) as Promise<Usuario | undefined>;

	}

  async insert(user: Usuario){
    const userRef = doc(this.firestore, `users/${user.id}`);
    await setDoc(userRef, user);
  }

  async update(id: string, user: Partial<Usuario>){
    await updateDoc(doc(this.firestore, `users/${id}`), user);
  }

}
