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
  id = ''; 
  dispo!:Observable<DisponibilidadI>;

  constructor(public modal: NgbModal, private rutaActiva: ActivatedRoute, private dispSrv: DisponibilidadService){}


  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params.id;
    console.log(this.id);
    this.dispSrv.traerDisponibilidadEspecialista(this.id).subscribe((data)=>{ 
          data.forEach((element:any) => {
            console.log(element.especialista_id ); 
            if(element.especialista_id  == this.id){
              console.log(element)
            }
          });
    });

 
  }

  reservarTurno(turno: any, hora?: any) {
    this.hora = hora;
    this.modal.open(turno);
  }

  aceptarTurno() {
    alert("aceptando turno...");
    this.modal.dismissAll();
  }

}
