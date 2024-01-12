import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactGuard } from './core/guards/contact.guard';
import { LayoutComponent } from './auth/layout/layout.component';
import { HomeComponent } from './home/home.component';

export const AppRoutingModule: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
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

  { path: '**', redirectTo: '/auth/sign-in', pathMatch: 'full' },
];
