import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ContactGuard } from './core/guards/contact.guard';

export const AppRoutingModule: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth-routing.module').then((m) => m.AuthRoutes),
    // canActivate: [authGuard],
  },

  {
    path: '',
    loadChildren: () =>
      import('./modules/contact/contact-routing.module').then(
        (m) => m.ContactRoutes
      ),

    canActivate: [ContactGuard],
  },
];
