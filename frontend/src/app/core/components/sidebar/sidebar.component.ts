import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BulkUploadPopupComponent } from '../../../contact/components/bulk-upload-popup/bulk-upload-popup.component';
import { LabelPopupComponent } from '../../../contact/components/label-popup/label-popup.component';
import { ContactService } from '../../../contact/service/contact.service';
import { Label } from '../../../contact/interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  labelList: Label[] = [];
  count: number = 0;

  dialog = inject(MatDialog);
  contactService = inject(ContactService);
  @Output() onAddLabel = new EventEmitter();

  ngOnInit() {
    // this.loadLabels();
    this.loadContactCount();
  }

  showBulkUploadPopup() {
    this.dialog.open(BulkUploadPopupComponent, {
      width: '500px',
    });
  }

  loadContactCount() {
    // Assuming you have a method in your ContactService to fetch the contact count
    this.contactService.getContactCount().subscribe((count) => {
      this.count = count;
    });
  }

  // loadLabels() {
  //   this.contactService.getLabels().subscribe((response) => {
  //     this.labelList = response.data.labels;
  //   });
  // }

  TrackLabel(label: Label) {
    return label._id;
  }

  showLabelPopup() {
    const dialogRef = this.dialog.open(LabelPopupComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.labelCreated.subscribe((newLabel: Label) => {
      this.labelList.push(newLabel);
      this.onAddLabel.emit();
    });
  }
}
