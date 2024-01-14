import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
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
export class SidebarComponent {
  labelList: Label[] = [];

  contactListLength!: number;

  dialog = inject(MatDialog);
  contactService = inject(ContactService);
  @Output() onAddLabel = new EventEmitter();

  ngOnInit() {
    this.contactService.contactListLength.subscribe((length) => {
      this.contactListLength = length;
    });
  }

  showBulkUploadPopup() {
    this.dialog.open(BulkUploadPopupComponent, {
      width: '500px',
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
