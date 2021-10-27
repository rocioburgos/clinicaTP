
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  mensaje: string = '';
  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router,
    private usrSrv: UsuariosService) {
    this.formulario = fb.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }


  async login() {
    const form = this.formulario.value;
    let datos = {
      email: form.email,
      clave: form.clave,
    };

    try {
      await this.authSrv.loginUser(datos.email, datos.clave).then(async (res) => {

        const user = (await this.usrSrv.getUserByUid('' + res?.user?.uid).toPromise()).data();


        localStorage.setItem('usuario_clinica', JSON.stringify({ ...user }));


        if (res.user?.emailVerified && user.perfil == 'administrador') {
          this.router.navigate(['panelUsuarios']);
        } else if (res.user?.emailVerified && user.perfil == 'especialista') {
          if (user.estado == 'aceptado') {

            this.router.navigate(['']);
          } else {
            console.log("querido especialista todavia no fue aceptado.");
          }
        } else if (res.user?.emailVerified && user.perfil == 'paciente') {
          this.router.navigate(['']);
        } else if (!res.user?.emailVerified) {
          this.router.navigate(['activarUsuario']);
        } else {
          this.router.navigate(['registro']);
        }
      });

      //TRAER EL PERFIL DEL LS
      /* let perfil:string= this.authSrv.getPerfil(datos.email);
       if (usuario != null) {
  
  
         if (usuario.user?.emailVerified && perfil == "administrador") {
           this.router.navigate(['panelUsuarios']);
         } else if (!usuario.user?.emailVerified) {
           this.router.navigate(['activarUsuario']);
         }else if(usuario.user?.emailVerified){ 
           this.router.navigate(['']);
         } else {
           this.router.navigate(['registro']);
         }
       }*/
    } catch (err) {
      console.log(err);
    }
  }


  completar(perfil: string) {
    if (perfil == 'especialista') {
      this.formulario.setValue({ 'email': 'rocioburgos00@gmail.com', 'clave': '123456' })
    } else if (perfil == 'administrador') {
      this.formulario.setValue({ 'email': '', 'clave': '' })
    } else if (perfil == 'paciente') {

      this.formulario.setValue({ 'email': '', 'clave': '' })
    }
  }

}
