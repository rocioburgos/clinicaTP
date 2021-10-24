import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EspecialistasService } from 'src/app/servicios/especialistas/especialistas.service';


@Component({
  selector: 'app-panel-usuarios',
  templateUrl: './panel-usuarios.component.html',
  styleUrls: ['./panel-usuarios.component.css']
})
export class PanelUsuariosComponent implements OnInit {

  especialistas : Array<any>=[];

   
  @ViewChild("myModalConf", {static: false}) myModalConf?: TemplateRef<any>;
  constructor(private modalService: NgbModal, private espSrv:EspecialistasService) { 
       this.espSrv.traerEspecialistas().subscribe((data)=>{
         this.especialistas = data;

       })
  }

  ngOnInit(): void {
  }


  mostrarModalEditar(){
   this.modalService.open(this.myModalConf).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  }

}
