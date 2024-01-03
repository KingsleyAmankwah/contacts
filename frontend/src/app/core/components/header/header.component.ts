import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
