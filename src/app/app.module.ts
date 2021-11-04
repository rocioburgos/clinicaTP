import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'; 
 
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component'; 
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component';
 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { PanelUsuariosComponent } from './componentes/panel-usuarios/panel-usuarios.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { ActivacionUserComponent } from './componentes/activacion-user/activacion-user.component';
import { RegistroAdministradorComponent } from './componentes/registro/registro-administrador/registro-administrador.component';
import { RegistroEspecialistaComponent } from './componentes/registro/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './componentes/registro/registro-paciente/registro-paciente.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ModalPruebaComponent } from './componentes/modal-prueba/modal-prueba.component'; 

import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { NavbarModule } from './componentes/navbar/navbar.module';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    
    HomeAdminComponent,
    PanelUsuariosComponent,
    LogoutComponent,
    ActivacionUserComponent,
    RegistroAdministradorComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    PerfilComponent,
    ModalPruebaComponent, 
  ],
  imports: [
    CommonModule ,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule ,
    AngularFireStorageModule,
    NgbModule, //PARA LOS USAR LOS MODALES DE BOOTSTRAP
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NavbarModule
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
