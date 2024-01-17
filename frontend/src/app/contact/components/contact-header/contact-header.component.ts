import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-header',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './contact-header.component.html',
  styleUrl: './contact-header.component.css',
})
export class ContactHeaderComponent {
  @Input() isTrash!: boolean;
}
