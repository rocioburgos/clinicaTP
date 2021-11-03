import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {

  private disponibilidadCollection: AngularFirestoreCollection<any>;
  constructor(private   afs: AngularFirestore) { 
    this.disponibilidadCollection = afs.collection('disponibilidad_especialistas');}
 
  guardarDisponibilidad(item:any){
    return this.disponibilidadCollection.add(Object.assign({},item));    
  }

  traerDisponibilidad(){
    return this.disponibilidadCollection.valueChanges( ); 
  }

  traerDisponibilidadEspecialista(id:string){
    return this.afs.collection('disponibilidad_especialistas', ref=>ref.where('especialista_id','==', id)  )
                      .valueChanges( )  
   
  }  
}
