import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean { 

      let ls = localStorage.getItem('usuario_clinica');

      if( ls != null){
        let userJson =    JSON.parse(ls);  
          return true;
        
      }else{
        return   false;
      }

      return false;

  }
  
}
