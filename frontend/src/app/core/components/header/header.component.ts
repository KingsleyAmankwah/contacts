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
  @Output() search = new EventEmitter<string>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onSearch(term: string) {
    this.search.emit(term);
  }

  handleInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value;
    this.onSearch(inputValue);
  }

  get initial() {
    if (!this.authService.user) return '';
    let [firstLetter, secondLetter = ''] =
      this.authService.user.name.split(' ');

    firstLetter =
      firstLetter && firstLetter[0] ? firstLetter[0].toUpperCase() : '';
    secondLetter =
      secondLetter && secondLetter[0] ? secondLetter[0].toUpperCase() : '';

    return `${firstLetter}${secondLetter}`.trim();
  }

  get colorCode() {
    return this.authService.user?.colorCode;
  }

  handleLogOut() {
    this.authService.onLogout();
  }
}
