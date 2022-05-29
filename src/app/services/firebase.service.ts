import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  myArray: any[] = [];
  constructor( private firestore: AngularFirestore ) { }

  addUser( data: User, dataval: any ) {
    
    this.firestore.collection('usuarios').add({
      Nombre: data.nombre,
      Correo: data.correo,
      Cedula: data.cedula,
      ValorSol: dataval.cantidadSolicitada,
      FechaApagar: dataval.fechaPagar
  })
  .then(res => {
     return (res);
  })
  .catch(e => {
     return (e);
  })
  }

  getUsersPrestamo() {
  return  this.firestore.collection("usuarios").get()
  }

  getAllUsers() {
    return new Promise<any>((resolve)=> {
    this.firestore.collection('usuarios').valueChanges({ idField: 'id' }).subscribe(users => resolve(users));
    })
   }

  updateUserPago(id:any) {
   return this.firestore.doc(`usuarios/${id}`).update({ValorSol: 0 })
   }

   eliminarSolicitud(id:any) {
    return this.firestore.doc(`usuarios/${id}`).delete()
   }
}
