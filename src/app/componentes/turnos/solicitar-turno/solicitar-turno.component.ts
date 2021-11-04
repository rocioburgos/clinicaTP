import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  especialidades: Array<any> = [];
  especialidadesFiltro:Array<any>=[] ; 
  especialistas:Array<any>=[];
  especialista_elegido='';
  especialidad_elegida='';
  constructor(private espSrv: EspecialidadesService, private usrSrv:UsuariosService , private router:Router, private active_Router:ActivatedRoute) {

      //cargo especialidades existentes en firebase
    this.espSrv.traerEspecialidades().subscribe((data) => {
      data.forEach(element => {
        this.especialidades.push(element);
      })
    })
  }

  ngOnInit(): void {
  }

  seleccion(event: any) { 
    this.especialidad_elegida= event.target.value;
    this.traerEspecialistasFiltro(event.target.value); 
  }

  traerEspecialistasFiltro(especialidad:string){
    this.especialistas= []; 
    this.especialistas=[{nombre:'Selecciones una opcion...'}]
    this.usrSrv.traerEspecialistasFiltro( ).subscribe((data)=>{
      data.forEach((element:any) => {
        element.espe.forEach((ret:any) => {
            if(ret == especialidad){
              this.especialistas.push(element)
              console.log(element);
            }
        });
      });
    })
  }


  seleccion_especialista(event: any) {
    this.especialista_elegido=  event.target.value;
  }


  verDisponibilidad(){
    console.log(this.especialista_elegido);
    this.router.navigate(['turnos/calendario/',this.especialista_elegido, this.especialidad_elegida ]);
  }

    

}
