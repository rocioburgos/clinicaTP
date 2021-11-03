import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { EspecialistasService } from 'src/app/servicios/especialistas/especialistas.service';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { FilesService } from '../../servicios/files/files.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

import { RecaptchaErrorParameters } from "ng-recaptcha";
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  //para el modal de crear especialidad
  @ViewChild("myModalConf", { static: false }) myModalConf?: TemplateRef<any>;

  paciente: any;
  especialista:any;
  administrador:any;
  tipoUsuario:Array<string> = [];

  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
 


  constructor(private _render:Renderer2) {
    this.paciente = null;
    this.especialista = null;
    this.administrador = null;
      let x: any = JSON.parse(localStorage.getItem('usuario_clinica') || '{}');
      if(x.perfil =='administrador'){
        this.tipoUsuario =['Especialista', 'Paciente', 'Administrador'];
      }else{
        this.tipoUsuario = ['Especialista', 'Paciente'];
      }


    
  }

  ngOnInit(): void {
    let script= this._render.createElement('script');
    script.defender = true;
    script.async= true;
    script.src='https://www.google.com/recaptcha/api.js';
    this._render.appendChild(document.body, script)
  }


  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    if (this.verSeleccion == 'Paciente') {
      this.paciente = true;
      this.especialista = false;
      this.administrador = false;
    } else if(this.verSeleccion == 'Especialista') {
      this.especialista = true;
      this.paciente = false;
      this.administrador = false;
    }else{
      this.administrador= true;
      this.especialista = false;
      this.paciente = false;
    }
  }


}
