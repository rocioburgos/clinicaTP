import { Component } from '@angular/core';  
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service'; 

@Component({
  selector: 'app-panel-usuarios',
  templateUrl: './panel-usuarios.component.html',
  styleUrls: ['./panel-usuarios.component.css']
})
export class PanelUsuariosComponent   {
 especialistas:Array<any>=[]; 
 
  constructor(  private espSrv: UsuariosService, private usrSrv:UsuariosService ) {
    this.espSrv.traerUsuarios().subscribe((data) => {
      this.especialistas = data;
      console.log(this.especialistas);
    });
  } 


  actualizarEstado(id:string, estado:string){
    console.log(id +" "+estado);
    let nuevoEstado='';
    if(estado=='pendiente'){
      nuevoEstado='aceptado';
    }else if(estado =='aceptado'){
      nuevoEstado='rechazado';
    }else if(estado=='rechazado'){
      nuevoEstado='aceptado';
    }


    this.usrSrv.actualizarEstado(id, nuevoEstado);
  }
}
