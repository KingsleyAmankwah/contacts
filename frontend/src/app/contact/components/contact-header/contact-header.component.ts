import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-header',
  standalone: true,
  imports: [MatIconModule, NgIf],
  templateUrl: './contact-header.component.html',
  styleUrl: './contact-header.component.css',
})
export class ContactHeaderComponent {
  isTrash = true;
}
