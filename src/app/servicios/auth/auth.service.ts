import { Injectable } from '@angular/core';
 


import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }


  public async registerUser(email: string, clave: string): Promise<any> {
    const resultado = await this.afAuth.createUserWithEmailAndPassword(email, clave);
    this.sendEmailVerification();
    return resultado;
  }


    async loginUser(email: string, clave: string) {
    try {
      const result = this.afAuth.signInWithEmailAndPassword(email, clave);
      return result;
      
    } catch (error) {
      console.log(error);
    }
    return null;
  }


  public async LogOut() { 
    this.afAuth.signOut();
    //actualizar el firebase
  }


  getCurrentUserFirebase(): Observable<any> {
    return this.afAuth.authState;
  }
 


  async sendEmailVerification(){
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

}
