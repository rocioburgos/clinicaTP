import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
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

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  //para el modal de crear especialidad
  @ViewChild("myModalConf", {static: false}) myModalConf?: TemplateRef<any>;

  paciente: any;
  tipoUsuario = ['Especialista', 'Paciente'];
  especialidades:Array<any>=[];

  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string = '0';
  verSeleccion: string = ''; 
  formulario: FormGroup;
  formularioEspecialista: FormGroup;
  formulario_Especialidad: FormGroup;
  completarForm = true;
  mensaje: string = ''; 
  img='';

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
    private modalService: NgbModal
  ) {
    this.paciente = null;

    this.formulario = fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      archivo1: [null, Validators.required],
      archivo2: [null, Validators.required]
    });

    this.formularioEspecialista = fbesp.group({
      nombre_: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]],
      especialidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      archivo:[null, Validators.required]
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

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    if (this.verSeleccion == 'Paciente') {
      this.paciente = true;
    } else {
      this.paciente = false;
    }
  }


 async aceptarPaciente() {
    const form = this.formulario.value;
    this.completarForm = false;
    let datos = {
      nombre: form.nombre,
      apellido: form.apellido,
      edad: form.edad,
      dni: form.dni,
      email: form.email,
      obraSocial: form.obraSocial,
      clave: form.clave,
      archivo2: form.archivo1,
      archivo1: form.archivo2,
      perfil:'paciente' 
    }

    try {
      const user = await this.authSrv.registerUser(datos.email, datos.clave); 
      if (user) {
        this.usuariosSrv.registrarUsuario(datos).then((res) => {
          console.log(datos);
          this.mensaje = 'Usuario creado';
        });

      }
    } catch (error) {
      console.log(error);
      this.mensaje=''+error;
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
      especialidad: formEspe.especialidad,
      clave: formEspe.clave,
      archivo: this.nombreArchivo,
      perfil:'especialista',
      estado: 'pendiente'
    };

    try {
      const user = await this.authSrv.registerUser(datos.email, datos.clave); 
      if (user) {
        this.usuariosSrv.registrarUsuario(datos).then((res) => {
          console.log(datos);
          this.mensaje = 'Usuario creado';
        }); 
      } 
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

 

  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event:any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) { 
       // event.target.files[i].name =this.getFilePath();
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
