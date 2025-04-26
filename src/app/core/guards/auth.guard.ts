import { Injectable } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private auth: Auth, private authService: AuthService) { }

  async canActivate(): Promise<boolean>{

    return new Promise(resolve => {
      onAuthStateChanged(this.auth, async (user) => {
        if (user){

          resolve(localStorage.getItem('token')===this.authService.getToken());

        }else{
          this.router.navigate(['/login']);
          resolve(false);
        }
      })
    })
  }

}
