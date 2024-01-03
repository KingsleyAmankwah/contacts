import { Routes } from '@angular/router';

export const AppRoutingModule: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth-routing.module').then((m) => m.AuthRoutes),
  },

  {
    path: '',
    loadChildren: () =>
      import('./modules/contact/contact-routing.module').then(
        (m) => m.ContactRoutes
      ),
  },
];
