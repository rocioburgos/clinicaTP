import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente/mis-turnos-paciente.component';
 
 
import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { CalendarioComponent } from './calendario/calendario.component'; 
 
import { TurnosComponent } from './turnos/turnos.component'; 
import { NavbarModule } from '../navbar/navbar.module';
 

@NgModule({
  declarations: [
    MisTurnosPacienteComponent,
    TurnosEspecialistaComponent,
    SolicitarTurnoComponent,
    CalendarioComponent,
    TurnosComponent 
  ],
  imports: [
    CommonModule, 
    TurnosRoutingModule, 
    NavbarModule
   
  ]
})
export class TurnosModule { }
