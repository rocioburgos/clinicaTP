import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

//import { AppRoutingModule } from './app-routing.module';
 
import { NavbarComponent } from './navbar.component';
 
@NgModule({
  declarations: [
   NavbarComponent
  ],
  imports: [
    CommonModule ,  
  ],
  exports: [NavbarComponent],
  providers: [],
  bootstrap: [ ]
})
export class NavbarModule { }
