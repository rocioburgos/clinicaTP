
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  mensaje: string = '';
  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router) {
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
    }

    try {
      let usuario = await this.authSrv.loginUser(datos.email, datos.clave);

      if (usuario != null) {
        if (usuario.user?.emailVerified) {
          this.router.navigate(['']);
        } else {
          this.mensaje = 'Verifique su email.';
        } 
      } else {
        this.router.navigate(['registro']);
      }
    } catch (error) {
      console.log(error);
      this.mensaje = '' + error;
    }
  }



  completar(perfil:string){
    if(perfil =='especialista'){
    this.formulario.setValue({'email':'rocioburgos00@gmail.com', 'clave':'123456'})  
  }else if(perfil=='administrador'){

  }else if(perfil == 'paciente'){
    
  }
  }

}
