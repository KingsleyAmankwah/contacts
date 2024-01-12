import { Component, OnInit, inject } from '@angular/core';
import { Contact } from '../../interface';
import { ContactService } from '../../service/contact.service';
import { ContactHeaderComponent } from '../../components/contact-header/contact-header.component';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-all-contacts',
  standalone: true,
  imports: [
    ContactHeaderComponent,
    ContactListComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './all-contacts.component.html',
  styleUrl: './all-contacts.component.css',
})
export class AllContactsComponent implements OnInit {
  contactList: Contact[] = [];
  isLoading = true;

  contactService = inject(ContactService);

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (response) => {
        this.contactList = response.data.contacts;
        // console.log(response.data.contacts);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
        this.isLoading = false;
      }
    );
  }

  trackByFn(index: number, contact: Contact): string {
    return contact._id;
  }
}
