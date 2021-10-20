import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { EspecialistasService } from 'src/app/servicios/especialistas/especialistas.service';
import { PacientesService } from 'src/app/servicios/pacientes/pacientes.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  paciente:any;
  tipoUsuario = ['Especialista', 'Paciente'];

  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';


  formulario:FormGroup; 
  formularioEspecialista:FormGroup;
  formulario_Especialidad:FormGroup;
  completarForm= true;
  mensaje:string='';
  constructor(private fb:FormBuilder, private fbesp:FormBuilder, 
              private router:Router, 
              private pacienteSrv:PacientesService, 
              private especialistasSrv:EspecialistasService, 
              private especialidadesSrv:EspecialidadesService
            ) {
    this.paciente= null;

    this.formulario= fb.group({ 
      nombre: ['', [Validators.required] ],
      apellido: ['', [Validators.required]], 
      edad: ['',[Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ['', [Validators.required,  Validators.pattern('^[0-9]*$'),  Validators.maxLength(10), Validators.minLength(10) ]],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required , Validators.email]], 
      clave: ['', Validators.required],
      imagen1: ['', Validators.required],
      imagen2: ['', Validators.required]
    });

    this.formularioEspecialista= fbesp.group({
      nombre_: ['', [Validators.required] ],
      apellido: ['', [Validators.required]], 
      edad: ['',[Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ['', [Validators.required,  Validators.pattern('^[0-9]*$'),  Validators.maxLength(10), Validators.minLength(10) ]],
      especialidad: ['', Validators.required],
      email: ['', [Validators.required , Validators.email]], 
      clave: ['', Validators.required],
      imagen1: ['', Validators.required], 
    });
    this.formulario_Especialidad = fb.group({
      nombre: ['', [Validators.required] ]
    })



  }

  ngOnInit(): void {
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    if(this.verSeleccion =='Paciente'){
      this.paciente = true;
    }else{
      this.paciente= false;
    }
  }

  
  aceptarPaciente(){
    const form = this.formulario.value; 
       this.completarForm= false;
     let datos = {
       nombre: form.nombre,
       apellido: form.apellido ,
       edad: form.edad ,
       dni: form.dni , 
       email: form.email,
       obraSocial: form.obraSocial,
       clave: form.clave,
       imagen1: form.imagen1,
       imagen2: form.imagen2
       }
    


     this.pacienteSrv.registrarPaciente(datos).then((res)=>{ 
      console.log(datos);
      this.mensaje= 'Usuario creado'; 
    }); 
     }


     aceptarEspecialista(){
      const formEspe = this.formularioEspecialista.value; 
      this.completarForm= false;
    let datos = {
      nombre: formEspe.nombre_,
      apellido: formEspe.apellido ,
      edad: formEspe.edad ,
      dni: formEspe.dni , 
      email: formEspe.email,
      especialidad: formEspe.especialidad,
      clave: formEspe.clave,
      imagen1: formEspe.imagen1
    }
   


    this.especialistasSrv.registrarEspecialista(datos).then((res)=>{ 
     console.log(datos);
     this.mensaje= 'Usuario creado'; 
   });
     }


     aceptarEspecialidad(){
      const form = this.formulario_Especialidad.value; 
      this.completarForm= false;
    let datos = {
      nombre: form.nombre
      }
   


    this.especialidadesSrv.registrarEspecialidad(datos).then((res)=>{ 
     console.log(datos);
     this.mensaje= 'Especialidad creada'; 
   });
     }

}
