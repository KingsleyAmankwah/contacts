import { Component, inject } from '@angular/core';
import { Contact } from '../../interface';
import { ContactService } from '../../service/contact.service';
import { ContactHeaderComponent } from '../../components/contact-header/contact-header.component';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';

@Component({
  selector: 'app-all-contacts',
  standalone: true,
  imports: [ContactHeaderComponent, ContactListComponent],
  templateUrl: './all-contacts.component.html',
  styleUrl: './all-contacts.component.css',
})
export class AllContactsComponent {
  allContacts: Contact[] = [];

  contactService = inject(ContactService);

  displayAllContacts() {
    this.contactService
      .getContacts()
      .subscribe(({ data: { contacts } }) => (this.allContacts = contacts));
  }
}
