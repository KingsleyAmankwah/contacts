import { Component, Input, OnInit, inject } from '@angular/core';
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
  isLoading = true;
  // isTrash = false;
  contactList: Contact[] = [];
  searchTerm = '';

  contactService = inject(ContactService);
  snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (response) => {
        this.contactList = response.data.contacts;
        this.contactService.updateContactListLength(this.contactList.length);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
        this.isLoading = false;
      }
    );

    this.contactService.getSearchTerm().subscribe((term) => {
      this.searchTerm = term;
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  handleDeteteContact(contactId: string) {
    // Display a confirmation dialog to the user
    if (!window.confirm('Are you sure to delete this contact?')) return;

    // If the user confirms, call the contactService to remove the contact by its ID
    this.contactService.removeContact([contactId]).subscribe(({ message }) => {
      // Show a snack bar notification with the message received from the server
      this.showSnackBar(message);
      console.log(message);

      // Update the local contactList array by filtering out the deleted contact
      this.contactList = this.contactList.filter(
        (contact) => contact._id !== contactId
      );

      // Update the contact list length by calling a method from the contactService
      this.contactService.updateContactListLength(this.contactList.length);
    });
  }

  get filteredContactList() {
    // Check if there is no search term provided
    if (!this.searchTerm) {
      // If no search term, return the original unfiltered contact list
      return this.contactList;
    }

    // If there is a search term, filter the contact list based on the name
    return this.contactList.filter((contact) =>
      // Include only contacts whose name contains the search term (case-insensitive)
      contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  trackByFn(index: number, contact: Contact): string {
    return contact._id;
  }
}
