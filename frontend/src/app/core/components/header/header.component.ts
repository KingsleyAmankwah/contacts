import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../auth/service/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService = inject(AuthService);

  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit(); // Call this method when the menu icon is clicked
  }

  get initial() {
    if (!this.authService.user) return '';
    let [firstLetter, secondLetter = ''] =
      this.authService.user.name.split(' ');
    return `${firstLetter[0].toUpperCase()}${secondLetter[0].toUpperCase()}`.trim();
  }

  get colorCode() {
    return this.authService.user?.colorCode;
  }

  handleLogOut() {
    this.authService.onLogout();
  }
}
