import { Component } from '@angular/core';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  closeForm() {
    this.router.navigateByUrl('/contact/list');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('contactId');

      if (id !== null) {
        this.contactId = id;

        this.contactService.getContactById(this.contactId).subscribe(
          (response) => {
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
