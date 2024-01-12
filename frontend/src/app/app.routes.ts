import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactGuard } from './core/guards/contact.guard';
import { LayoutComponent } from './auth/layout/layout.component';

export const AppRoutingModule: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutes),
  },

  {
    path: 'contact',
    canActivate: [ContactGuard],
    loadChildren: () =>
      import('./contact/contact-routing.module').then((m) => m.ContactRoutes),
  },

  {
    path: '',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full',
  },
];
