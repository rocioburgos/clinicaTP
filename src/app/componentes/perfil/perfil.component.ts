import { Component, OnInit } from '@angular/core';
import { DisponibilidadService } from 'src/app/servicios/disponibilidad/disponibilidad.service';

export interface DisponibilidadI { 
 // especialista_id:string;
 // especialidad: string;
  dia: string,
   hora_ingreso: string ,
   hora_egreso: string 
}
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  especialista?: boolean;
  diasAtencion: Array<string> = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
  perfil: any;

  disponibilidad: Array<DisponibilidadI> = [ ];
  showMensaje: boolean = false;
  mensaje: string = '';

  constructor(private dispoSrv: DisponibilidadService) {
    let ls = localStorage.getItem('usuario_clinica');
    if (ls != null) {
      this.perfil = JSON.parse(ls);
      if (this.perfil.perfil == 'especialista') {
        this.especialista = true;
      } else {
        this.especialista = false;
      }
    } 
  }

  ngOnInit(): void { }

  aver(event: any, dia_p: string, tipo_p: string, especialidad_p: string) {
    let valor = event.target.value;
    let updated: boolean= false;
    let hora_ingreso; let hora_egreso;
    this.disponibilidad.forEach(element => {
      console.log(element);
     // if (element.especialidad == especialidad_p && element.dia == dia_p ) {
      if (  element.dia == dia_p ) {
        if( tipo_p== 'ingreso'){
          
        element.hora_ingreso = valor;
        }else{
          element.hora_egreso= valor;
        }
        updated= true;
      }
    });
  
    if(!updated){
      if(tipo_p =='ingreso'){
        hora_ingreso = valor;
      }else{
        hora_egreso= valor;
      }
      this.disponibilidad.push({ 
       // especialista_id: this.perfil.uid,
       // especialidad:especialidad_p,
        dia: dia_p,
        hora_ingreso: hora_ingreso,
        hora_egreso: hora_egreso
      } );
    }  
  }

  guardarDisponibiliad(especialidad:string) { 


    this.dispoSrv.guardarDisponibilidad({'especialista_id': this.perfil.uid,'especialidad': especialidad,'horarios' :this.disponibilidad}).then((res) => {
      this.showMensaje = true;
      this.mensaje = 'Guardado con exito';
    }).catch((err) => {
      this.showMensaje = true;
      this.mensaje = 'Error al guardar.'
    });
  }
}
