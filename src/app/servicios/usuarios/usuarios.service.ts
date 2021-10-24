import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  private usuariosCollection:AngularFirestoreCollection<any>;
  
  constructor(private readonly afs: AngularFirestore) {   
    this.usuariosCollection = afs.collection<any>('usuarios'); 
  }


  registrarUsuario(datoUser:any){ 
    this.usuariosCollection =  this.afs.collection('usuarios');  
    return this.usuariosCollection.add(Object.assign({},datoUser)); 
  }


  //this.afs.collection('usuarios', ref => ref.where('','==',''))
}
