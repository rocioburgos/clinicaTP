
import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { FilesService } from 'src/app/servicios/files/files.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';
@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
  paciente: any;
  mensaje: string = '';
  formulario: FormGroup;
  completarForm = true;
  mensajeImagen: string = '';
  img1 = '';
  img2 = '';
  public mensajeArchivo = 'No hay un archivo seleccionado';

  public nombreArchivo = '';
  img = '';

  captcha: string;      // empty = not yet proven to be a human, anything else = human
  constructor(private fb: FormBuilder,
    private authSrv: AuthService,
    private usuariosSrv: UsuariosService,
    private router: Router,
    private fileSrv: FilesService) {
    this.paciente = null;
    this.captcha = '';
    this.formulario = fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      archivo1: [null, Validators.required],
      archivo2: [null, Validators.required],
      c: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log('resolved captcha with response: ' + this.captcha);
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
      archivo2: this.img1,
      archivo1: this.img2,
      perfil: 'paciente'
    }

    try {
      const user = await this.authSrv.registerUser(datos.email, datos.clave).then((credential) => {
        this.usuariosSrv.setItemWithId(datos, credential.user.uid)
          .then(() => this.router.navigate(['activarUsuario']));;
      });
    } catch (error) {
      console.log(error);
      this.mensaje = '' + error;
    }


  }

  getFilePath() {
    return new Date().getTime() + '-paciente';
  }


  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo1(event: any) {
    this.img1 = this.getFilePath();
    let task = this.fileSrv.uploadFile(this.img1, event.target.files[0]).then((res) => {
      res.ref.getDownloadURL()
        .then(ress => {
          this.img1 = (ress);
        });
    });
  }


  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo2(event: any) {

    this.img2 = this.getFilePath();
    let task = this.fileSrv.uploadFile(this.img2, event.target.files[0]).then((res) => {
      res.ref.getDownloadURL()
        .then(ress => {
          this.img2 = (ress);
        });
    });

  }




}
