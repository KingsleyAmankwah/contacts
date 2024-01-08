import { Component, EventEmitter, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContactDetail } from '../../interface';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css',
})
export class AddContactComponent {
  showImage!: boolean;
  contactDetail = {} as ContactDetail;
  onClose = new EventEmitter();
}
