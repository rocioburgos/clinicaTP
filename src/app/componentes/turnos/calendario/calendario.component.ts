import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { DisponibilidadService } from 'src/app/servicios/disponibilidad/disponibilidad.service';
import { Observable } from 'rxjs';
import { DisponibilidadI } from './../../perfil/perfil.component'
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  hora: string = '';
  turno:any=''; 
  id_disponibilidad:any='';
  id = ''; 
  especialidad= ''; 
  dispo!:Observable<any>;
  especialista='';
  constructor(public modal: NgbModal, private rutaActiva: ActivatedRoute, private dispSrv: DisponibilidadService){}


  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params.id.replace(/\s/g, "");;
    this.especialidad = this.rutaActiva.snapshot.params.especialidad.replace(/\s/g, "");
    this.dispSrv.traerDisponibilidad().subscribe((data)=>{
      data.forEach(element => {   
        if(element.especialista_id == this.id && element.especialidad.replace(/\s/g, "") ==this.especialidad){ 
          element.horarios.forEach((hora:any) => {
              console.log(hora);
            
          });
        }
      });
    });

    //levantar los datos del especialista 
  }

  reservarTurno(turno: any, hora: any, id_disponibilidad:any) {
    this.hora = hora;
    this.id_disponibilidad= id_disponibilidad;
    this.turno= turno;
    this.modal.open(turno);
  }

  aceptarTurno() {
    alert("aceptando turno...");
    this.modal.dismissAll();
  }

}
