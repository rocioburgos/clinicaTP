import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  especialista?:boolean;
  perfil:any;
  constructor() { 
    let ls = localStorage.getItem('usuario_clinica'); 
    if( ls != null){ 
         this.perfil =    JSON.parse( ls);  
         if(this.perfil.perfil=='especialista'){
           this.especialista=true;
         }else{
           this.especialista=false;
         }
    } 
  }

  ngOnInit(): void {

  }

}
