import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AllContactsComponent } from './pages/all-contacts/all-contacts.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { TrashComponent } from './pages/trash/trash.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';

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

      {
        path: ':contactId/edit',
        component: EditContactComponent,
        title: 'Edit Contact',
      },

      { path: 'trash', component: TrashComponent, title: 'Trash' },
    ],
  },
];
