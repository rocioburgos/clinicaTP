import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivacionUserComponent } from './componentes/activacion-user/activacion-user.component';
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { PanelUsuariosComponent } from './componentes/panel-usuarios/panel-usuarios.component';
import { RegistroAdministradorComponent } from './componentes/registro/registro-administrador/registro-administrador.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AdminGuard } from './guard/admin.guard';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'registro', component:RegistroComponent},
  {path:'registroAdmin', component:RegistroAdministradorComponent, canActivate:[AdminGuard]},
  {path:'login', component:LoginComponent},
  {path:'homeAdmin', component:HomeAdminComponent, canActivate:[LoginGuard, AdminGuard] },
  {path:'panelUsuarios', component:PanelUsuariosComponent , canActivate:[LoginGuard, AdminGuard]},
  {path:'logout', component:LogoutComponent,  canActivate:[LoginGuard]},
  {path:'activarUsuario', component:ActivacionUserComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
