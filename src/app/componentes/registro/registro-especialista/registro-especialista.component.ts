import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { EspecialistasService } from 'src/app/servicios/especialistas/especialistas.service';
 
  
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

 
import { FilesService } from 'src/app/servicios/files/files.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.css']
})
export class RegistroEspecialistaComponent implements OnInit {
  //para el modal de crear especialidad
  @ViewChild("myModalConf", {static: false}) myModalConf?: TemplateRef<any>;
 
  especialidades:Array<any>=[];
  especialidadesElegidas:Array<any>=[];
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string = '0';
  verSeleccion: string = ''; 
 
  formularioEspecialista: FormGroup;
  formulario_Especialidad: FormGroup;
  completarForm = true;
  mensaje: string = ''; 
  img='';
  mensajeImagen:string='';

  public mensajeArchivo = 'No hay un archivo seleccionado';
   
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;
  constructor(private fb: FormBuilder, 
    private fbesp: FormBuilder,
    private router: Router,
    private usuariosSrv: UsuariosService, 
    private especialidadesSrv: EspecialidadesService,
    private authSrv: AuthService,
    private fileSrv:FilesService,
    private modalService: NgbModal) {

    this.formularioEspecialista = fbesp.group({
      nombre_: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]],
  
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      archivo:[null, Validators.required],
      especialidadCheck:[null, this.validarEspecialidad ]
    });
 
    this.formulario_Especialidad = fb.group({
      nombre: ['', [Validators.required]]
    });
    
    
    this.especialidadesSrv.traerEspecialidades().subscribe((res)=>{
      this.especialidades= res;
    })
   }

  ngOnInit(): void {
  }


    
  validarEspecialidad(control:AbstractControl){
    const especialidadesElegidas = control.value;
    if( especialidadesElegidas== null ||  especialidadesElegidas.length <= 0){
      return {vacio: true}
    }else{
      return null;
    }
  }


  

 async aceptarEspecialista() {
  const formEspe = this.formularioEspecialista.value;
  this.completarForm = false;
  let datos = {
    nombre: formEspe.nombre_,
    apellido: formEspe.apellido,
    edad: formEspe.edad,
    dni: formEspe.dni,
    email: formEspe.email, 
    clave: formEspe.clave,
    archivo: this.nombreArchivo,
    perfil:'especialista',
    estado: 'pendiente',
    espe: this.especialidadesElegidas
  };

  try {
    const user = await this.authSrv.registerUser(datos.email, datos.clave).then((credential)=>{
      this.usuariosSrv.setItemWithId( datos, credential.user.uid)
      .then(()=>  this.router.navigate(['activarUsuario']));;
    });  
  } catch (error) {
    console.log(error);
    this.mensaje=''+error;
  }
}


aceptarEspecialidad() {
  const form = this.formulario_Especialidad.value;
  this.completarForm = false;
  let datos = {
    nombre: form.nombre
  } 

  this.especialidadesSrv.registrarEspecialidad(datos).then((res) => {
    console.log(datos);
    this.mensaje = 'Especialidad creada';
    this.modalService.open(this.myModalConf).close('Si');
  });
}

selEsp(event:any){  
    if(event.target.checked== true){
      this.especialidadesElegidas.push(event.target.value);
    }
    else if(event.target.checked== false){ 
      const indice = this.especialidadesElegidas.indexOf(event.target.value).valueOf();
      this.especialidadesElegidas.splice(indice, 1);
    } 
}

//Evento que se gatilla cuando el input de tipo archivo cambia
public cambioArchivo(event:any) {
  if (event.target.files.length > 0) {
    for (let i = 0; i < event.target.files.length; i++) { 
     // event.target.files[i].name =this.getFilePath();
     this.mensajeImagen='Subiendo imagen...';
      this.nombreArchivo = this.getFilePath(); //= event.target.files[i].name;  
     
      this.subirArchivo();
    }
  } else {
    this.mensajeArchivo = 'No hay un archivo seleccionado';
  }
}

//Sube el archivo a Cloud Storage
async  subirArchivo() { 
  let archivo = this.formularioEspecialista.get('archivo');
  let referencia = this.fileSrv.referenciaCloudStorage(this.nombreArchivo);
  let tarea = this.fileSrv.tareaCloudStorage(this.nombreArchivo, archivo); 
  
  tarea.then(async res=>{
    const downloadURL = await  res.ref.getDownloadURL();
    console.log(downloadURL);
    //this.nombreArchivo= downloadURL;
    this.img = downloadURL;
    this.mensajeImagen='';
  }); 
}

getFilePath() {
  return new Date().getTime() + '-usuarios';
}


mostrarModalEditar(){
  this.modalService.open(this.myModalConf).result.then( r => {
     console.log("Tu respuesta ha sido: " + r);
   }, error => {
     console.log(error);
   });
 }


}
