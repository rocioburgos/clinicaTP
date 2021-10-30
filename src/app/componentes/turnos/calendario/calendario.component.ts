import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

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
