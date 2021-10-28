import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialistaGuard } from 'src/app/guard/especialista.guard';
import { PacienteGuard } from 'src/app/guard/paciente.guard';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente/mis-turnos-paciente.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
 
const routes: Routes = [
    {
      path: 'listadoTurnoPaciente', 
      component:MisTurnosPacienteComponent,
      canActivate:[ PacienteGuard]  
    },
    {
      path: 'listadoTurnoEspecialista', 
      component:TurnosEspecialistaComponent,
      canActivate:[ EspecialistaGuard]  
    },
   
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TurnosRoutingModule { }