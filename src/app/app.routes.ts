import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'input-details',
    loadComponent: () => import('./input-details/input-details.page').then( m => m.InputDetailsPage)
  },
  {
    path: 'manage-expenses',
    loadComponent: () => import('./manage-expenses/manage-expenses.page').then( m => m.ManageExpensesPage)
  }
];
