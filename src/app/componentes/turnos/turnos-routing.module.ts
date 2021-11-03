import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guard/admin.guard';
import { EspecialistaGuard } from 'src/app/guard/especialista.guard';
import { PacienteGuard } from 'src/app/guard/paciente.guard';
import { RegistroAdministradorComponent } from '../registro/registro-administrador/registro-administrador.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente/mis-turnos-paciente.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
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
    {
      path: 'nuevoturno', 
      component:SolicitarTurnoComponent,
      canActivate:[PacienteGuard || AdminGuard ]
    },
    {
      path: 'calendario/:id', 
      component:CalendarioComponent,
      canActivate:[PacienteGuard || AdminGuard ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TurnosRoutingModule { }