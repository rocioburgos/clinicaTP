import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal , } from '@ng-bootstrap/ng-bootstrap';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-modal-prueba',
  templateUrl: './modal-prueba.component.html',
  styleUrls: ['./modal-prueba.component.css']
})
export class ModalPruebaComponent implements OnInit {
 
  hora:string='';

  constructor(public modal: NgbModal) { }

  ngOnInit(): void {
  } 

  reservarTurno(turno:any, hora?:any) {
    this.hora= hora;
    this.modal.open(turno); 
  }

  aceptarTurno(){
    alert("aceptando turno..."); 
     this.modal.dismissAll();
  }

} 