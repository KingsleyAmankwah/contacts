import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactGuard } from './core/guards/contact.guard';

export const AppRoutingModule: Routes = [
  {
    path: 'auth',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/auth/auth-routing.module').then((m) => m.AuthRoutes),
  },

  {
    path: 'contact',
    canActivate: [ContactGuard],
    loadChildren: () =>
      import('./modules/contact/contact-routing.module').then(
        (m) => m.ContactRoutes
      ),
  },
];
