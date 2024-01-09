import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bulk-upload-popup',
  standalone: true,
  imports: [],
  templateUrl: './bulk-upload-popup.component.html',
  styleUrl: './bulk-upload-popup.component.css',
})
export class BulkUploadPopupComponent {
  file: File | null = null;

  dialogRef = inject(MatDialogRef<BulkUploadPopupComponent>);

  handleFileUpload() {
    if (!this.file) return;
  }
}
