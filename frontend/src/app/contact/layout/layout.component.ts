import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  contactService = inject(ContactService);

  sidebarExpanded = false; // A boolean to track if the sidebar is expanded or not

  onToggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded; // Toggle the sidebarExpanded boolean
  }
}
