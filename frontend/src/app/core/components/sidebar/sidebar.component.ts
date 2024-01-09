import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BulkUploadPopupComponent } from '../../../contact/components/bulk-upload-popup/bulk-upload-popup.component';
import { LabelPopupComponent } from '../../../contact/components/label-popup/label-popup.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  count: number = 0;

  dialog = inject(MatDialog);
  @Output() onAddLabel = new EventEmitter();

  showBulkUploadPopup() {
    this.dialog.open(BulkUploadPopupComponent, {
      width: '500px',
    });
  }

  showLabelPopup() {
    this.dialog.open(LabelPopupComponent, {
      width: '500px',
      // other configuration
    });
  }
}
