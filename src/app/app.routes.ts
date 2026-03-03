import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuardGuard } from './auth/auth-guard-guard';
import { loginGuardGuard } from './auth/login/login-guard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
    {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard')
        .then(m => m.Dashboard),
         canActivate:[authGuardGuard],
  },
  {
    path:'login',
    loadComponent:()=>import('./auth/login/login').then(m=>m.Login),
    canActivate:[loginGuardGuard]
  },
  {
    path:'add-user',
    loadComponent:()=>import('./pages/add-user/add-user').then(m=>m.AddUser)
  },
  {
    path:'user-list',
    loadComponent:()=>import('./pages/users/users').then(m=>m.Users)
  }
  
];
