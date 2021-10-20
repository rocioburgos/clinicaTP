import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private pacientesCollection:AngularFirestoreCollection<any>;
  encuestas:Observable<any[]>;
  constructor(private readonly afs: AngularFirestore) { 
    

    this.pacientesCollection = afs.collection<any>('pacientes');
    this.encuestas= this.pacientesCollection.valueChanges();
  }


  registrarPaciente(datoUser:any){ 
    this.pacientesCollection =  this.afs.collection('pacientes');  
    return this.pacientesCollection.add(Object.assign({},datoUser)); 
  }
}
