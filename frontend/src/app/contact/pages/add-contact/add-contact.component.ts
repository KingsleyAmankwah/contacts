import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContactDetail } from '../../interface';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [MatIconModule, ContactFormComponent],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css',
})
export class AddContactComponent {
  router = inject(Router);

  handleCloseForm() {
    this.router.navigateByUrl('/contact/list');
  }
}
