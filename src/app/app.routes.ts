import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },

  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'main',
    canActivate: [authGuard],
    loadComponent: () => import('./main/main.page').then(m => m.MainPage)
  },

  { path: '**', redirectTo: 'main' }
];
