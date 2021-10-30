import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente/mis-turnos-paciente.component';
 
 
import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { CalendarioComponent } from './calendario/calendario.component';
 

@NgModule({
  declarations: [
    MisTurnosPacienteComponent,
    TurnosEspecialistaComponent,
    SolicitarTurnoComponent,
    CalendarioComponent,
  
  ],
  imports: [
    CommonModule, 
    TurnosRoutingModule,
   
  ]
})
export class TurnosModule { }
