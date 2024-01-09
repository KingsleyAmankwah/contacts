import { Component } from '@angular/core';
import { ContactHeaderComponent } from '../../components/contact-header/contact-header.component';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [ContactHeaderComponent],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent {}
