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
 


  uploadFile(filePath:string, file:any)  {
    return this.storage.upload(filePath, file);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
