import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
 

  private especialidadesCollection:AngularFirestoreCollection<any>;
  encuestas:Observable<any[]>;
  constructor(private readonly afs: AngularFirestore) { 
    

    this.especialidadesCollection = afs.collection<any>('especialidades');
    this.encuestas= this.especialidadesCollection.valueChanges();
  }


  registrarEspecialidad(datoUser:any){ 
    this.especialidadesCollection =  this.afs.collection('especialidades');  
    return this.especialidadesCollection.add(Object.assign({},datoUser)); 
  }

  traerEspecialidades(){
    
  }
}
