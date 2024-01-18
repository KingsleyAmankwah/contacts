import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactDetail } from '../../interface';
import { ContactService } from '../../service/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-contact',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './view-contact.component.html',
  styleUrl: './view-contact.component.css',
})
export class ViewContactComponent {
  contactId!: string;
  contactDetail = {} as ContactDetail;
  isLoading = true;

  router = inject(Router);
  route = inject(ActivatedRoute);
  contactService = inject(ContactService);
  closeForm() {
    this.router.navigateByUrl('/contact/list');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('contactId');
      // console.log('Contact ID:', id);

      if (id !== null) {
        this.contactId = id;

        // Fetch contact details based on the ID
        this.contactService.getContactById(this.contactId).subscribe(
          (response) => {
            // console.log('Contact Details:', response.data.contact);
            this.isLoading = false;
            this.contactDetail = response.data.contact;
          },
          (error) => {
            console.log('Error:', error);
            this.isLoading = false;
          }
        );
      }
    });
  }
}
