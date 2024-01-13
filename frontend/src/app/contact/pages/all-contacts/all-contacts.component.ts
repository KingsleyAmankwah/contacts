import { Component, OnInit, inject } from '@angular/core';
import { Contact } from '../../interface';
import { ContactService } from '../../service/contact.service';
import { ContactHeaderComponent } from '../../components/contact-header/contact-header.component';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-contacts',
  standalone: true,
  imports: [
    ContactHeaderComponent,
    ContactListComponent,
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './all-contacts.component.html',
  styleUrl: './all-contacts.component.css',
})
export class AllContactsComponent implements OnInit {
  contactList: Contact[] = [];
  isLoading = true;

  contactService = inject(ContactService);
  snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (response) => {
        this.contactList = response.data.contacts;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
        this.isLoading = false;
      }
    );
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  handleDeteteContact(contactId: string) {
    if (!window.confirm('Are you sure to delete this contact?')) return;

    this.contactService.removeContact([contactId]).subscribe(({ message }) => {
      this.showSnackBar(message);
      console.log(message);
      this.contactList = this.contactList.filter(
        (contact) => contact._id !== contactId
      );
    });
  }

  trackByFn(index: number, contact: Contact): string {
    return contact._id;
  }
}
