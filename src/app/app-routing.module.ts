import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivacionUserComponent } from './componentes/activacion-user/activacion-user.component';
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { ModalPruebaComponent } from './componentes/modal-prueba/modal-prueba.component';
import { PanelUsuariosComponent } from './componentes/panel-usuarios/panel-usuarios.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroAdministradorComponent } from './componentes/registro/registro-administrador/registro-administrador.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CalendarioComponent } from './componentes/turnos/calendario/calendario.component';
import { AdminGuard } from './guard/admin.guard';
import { EspecialistaGuard } from './guard/especialista.guard';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'registro', component:RegistroComponent},
  {path:'registroAdmin', component:RegistroAdministradorComponent, canActivate:[AdminGuard]},
  {path:'login', component:LoginComponent},
  {path:'homeAdmin', component:HomeAdminComponent, canActivate:[LoginGuard, AdminGuard] },
  {path:'panelUsuarios', component:PanelUsuariosComponent , canActivate:[LoginGuard, AdminGuard]},
  {path:'logout', component:LogoutComponent,  canActivate:[LoginGuard]},
  {path:'activarUsuario', component:ActivacionUserComponent},
  {
    path: 'turnos',
    loadChildren: () => import('./componentes/turnos/turnos.module').then(m => m.TurnosModule)
  },
  {path:'perfil', component: PerfilComponent,canActivate:[LoginGuard]},
  {path:'test', component: ModalPruebaComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
