import { Component } from '@angular/core';
import { ContactHeaderComponent } from '../../components/contact-header/contact-header.component';
import { Contact } from '../../interface';
import { ContactService } from '../../service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [ContactHeaderComponent, CommonModule, MatIconModule],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent {
  isLoading = true;
  isTrash = true;
  trashList: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  showSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  ngOnInit() {
    this.contactService.getAllTrash().subscribe(
      (response) => {
        this.trashList = response.data.contacts;
        this.isLoading = false;
      },
      (error) => {
        console.info('Error fetching trash list:', error);
        this.isLoading = false;
      }
    );
  }

  trackById(index: number, contact: Contact): string {
    return contact._id;
  }

  formatTime(date: string) {
    return dayjs.tz(new Date(date), 'Asia/Kolkata').format('MMM D');
  }

  restoreContact(contactId: string) {
    this.contactService.recoverContact(contactId).subscribe(
      (response) => {
        this.trashList = this.trashList.filter(
          (contact) => contact._id !== contactId
        );
        this.showSnackBar(response.message);
      },
      (error) => {
        this.showSnackBar('Error recovering contact');
      }
    );
  }

  emptyTrash() {
    if (this.trashList.length !== 0) {
      if (
        !window.confirm(
          'Are you sure you want to permanently delete the contact?'
        )
      )
        return;

      this.contactService.clearTrash().subscribe(
        (response) => {
          this.trashList = [];
          this.showSnackBar(response.message);
        },
        (error) => {
          this.showSnackBar('Error emptying trash');
        }
      );
    }
  }
}
