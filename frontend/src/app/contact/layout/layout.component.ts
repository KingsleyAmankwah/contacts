import { Component, Input, inject } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ContactService } from '../service/contact.service';
import { Contact } from '../interface';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  contactList: Contact[] = [];
  sidebarExpanded = false;

  constructor(private contactService: ContactService) {}

  onToggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  onSearch(term: string) {
    this.contactService.updateSearchTerm(term);
  }
}
