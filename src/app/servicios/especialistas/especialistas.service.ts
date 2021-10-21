import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {

  private especialistasCollection:AngularFirestoreCollection<any>;
  especialistas:Observable<any[]>;
  constructor(private readonly afs: AngularFirestore) { 
    

    this.especialistasCollection = afs.collection<any>('especialistas');
    this.especialistas= this.especialistasCollection.valueChanges();
  }


  registrarEspecialista(datoUser:any){ 
    this.especialistasCollection =  this.afs.collection('especialistas');  
    return this.especialistasCollection.add(Object.assign({},datoUser)); 
  }


  traerEspecialistas(){
    return this.especialistasCollection.valueChanges({idField: "doc_id"});
  }
}
