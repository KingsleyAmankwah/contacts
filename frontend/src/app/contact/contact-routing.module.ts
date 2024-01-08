import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AllContactsComponent } from './pages/all-contacts/all-contacts.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { TrashComponent } from './pages/trash/trash.component';

export const ContactRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'list',
        component: AllContactsComponent,
        title: 'All Contact',
      },
      {
        path: 'add',
        component: AddContactComponent,
        title: 'Add Contact',
      },

      { path: 'trash', component: TrashComponent, title: 'Trash' },
    ],
  },
];
