import { Component, OnInit } from '@angular/core';
import { DisponibilidadService } from 'src/app/servicios/disponibilidad/disponibilidad.service';

interface DisponibilidadI { 
  especialista_id:string;
  especialidad: string;
  dia: string,
  tipo: string, hora: string 
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
    this.disponibilidad.forEach(element => {
      console.log(element);
      if (element.especialidad == especialidad_p && element.dia == dia_p && element.tipo == tipo_p) {
        element.hora = valor;
        updated= true;
      }
    });
  
    if(!updated){
      this.disponibilidad.push({ 
        especialista_id: this.perfil.uid,
        especialidad:especialidad_p,
        dia: dia_p,
        tipo: tipo_p,
        hora: valor
      } );
    }  
  }

  guardarDisponibiliad() { 
    this.dispoSrv.guardarDisponibilidad(this.disponibilidad).then((res) => {
      this.showMensaje = true;
      this.mensaje = 'Guardado con exito';
    }).catch((err) => {
      this.showMensaje = true;
      this.mensaje = 'Error al guardar.'
    });
  }
}
