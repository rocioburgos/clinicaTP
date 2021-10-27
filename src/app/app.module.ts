import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FooterComponent } from './componentes/footer/footer.component';
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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    FooterComponent,
    HomeAdminComponent,
    PanelUsuariosComponent,
    LogoutComponent,
    ActivacionUserComponent,
    RegistroAdministradorComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
