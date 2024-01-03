import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'sign-in', component: SignInComponent, title: 'Sign In' },
      { path: 'sign-up', component: SignUpComponent, title: 'Sign Up' },
    ],
  },
];
