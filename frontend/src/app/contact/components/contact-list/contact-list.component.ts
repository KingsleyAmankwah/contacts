import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../../interface';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  @Input() contacts!: Contact[];

  // formatTime(date: string) {
  //   return dayjs.tz(new Date(date), "Asia/Kolkata").format("MMM D");
  // }
}
