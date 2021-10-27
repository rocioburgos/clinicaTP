import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators'; 
import { ArrayType } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private filePath:any;
  private dowloandURL?:Observable<string>;

  constructor(
    private storage: AngularFireStorage
  ) { 
   }

  //Tarea para subir archivo
 async   subirImagen(  datos: any) {
   this.filePath = datos.name;
   const refFile= this.storage.ref(this.filePath);
  
   const task= this.storage.upload(this.filePath, datos);
    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        refFile.getDownloadURL().subscribe(urlImagen=>{
          this.dowloandURL= urlImagen;
         return urlImagen;
        })
      })
    ) 
  }


  uploadFile(filePath:string, file:any)  {
    return this.storage.upload(filePath, file);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
