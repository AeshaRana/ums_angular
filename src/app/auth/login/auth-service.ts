import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router=inject(Router);

  isLoggedIn():boolean
  {
    return localStorage.getItem('token')?true:false;
  }

  logOut()
  {
     localStorage.removeItem('token');
    this.router.navigate(['/login']);
   
     
  }}

