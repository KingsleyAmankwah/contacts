import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../modules/auth/service/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService = inject(AuthService);

  // get initial() {
  //   if (!this.authService.user) return '';
  //   let [firstLetter, secondLetter = ''] =
  //     this.authService.user.name.split(' ');
  //   return `${firstLetter[0].toUpperCase()}${secondLetter[0].toUpperCase()}`.trim();
  // }

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

  handleLogOut() {
    this.authService.onLogout();
  }
}
