import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  constructor(private espSrv: EspecialidadesService, private usrSrv:UsuariosService,
    public modal: NgbModal) {
    this.espSrv.traerEspecialidades().subscribe((data) => {
      data.forEach(element => {
        this.especialidades.push(element);
      })
    })
  }

  ngOnInit(): void {
  }

  seleccion(event: any) {
    if (event.target.checked) {
      this.especialidadesFiltro.push(event.target.value);
      this.traerEspecialistasFiltro(event.target.value);
    }
  }

  traerEspecialistasFiltro(especialidad:string){
    this.usrSrv.traerEspecialistasFiltro( ).subscribe((data)=>{
      data.forEach((element:any) => {
        element.espe.forEach((ret:any) => {
            if(ret == especialidad){
              this.especialidadesFiltro.push(element)
            }
        });
      });
    })
  }


    

}
