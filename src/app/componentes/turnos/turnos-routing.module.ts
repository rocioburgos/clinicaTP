import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteGuard } from 'src/app/guard/paciente.guard';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente/mis-turnos-paciente.component';
 
const routes: Routes = [
    {
      path: '', 
      component:MisTurnosPacienteComponent,
      canActivate:[ PacienteGuard]  
    },
   
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TurnosRoutingModule { }