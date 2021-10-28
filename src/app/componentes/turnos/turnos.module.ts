import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosPacienteComponent } from './mis-turnos-paciente/mis-turnos-paciente.component';
 
 
import { TurnosRoutingModule } from './turnos-routing.module';
 

@NgModule({
  declarations: [
    MisTurnosPacienteComponent,
  
  ],
  imports: [
    CommonModule, 
    TurnosRoutingModule,
   
  ]
})
export class TurnosModule { }
