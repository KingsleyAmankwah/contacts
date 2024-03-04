import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../../../core/components/input/input.component';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../service/contact.service';
import { Label } from '../../interface';

@Component({
  selector: 'app-label-popup',
  standalone: true,
  imports: [InputComponent, MatSnackBarModule],
  templateUrl: './label-popup.component.html',
  styleUrl: './label-popup.component.css',
})
export class LabelPopupComponent {
  label!: Label;
  @Output() labelCreated = new EventEmitter<Label>();
  isSubmitted = false;

  dialogRef = inject(MatDialogRef<LabelPopupComponent>);

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  form = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  get name() {
    return this.form.controls['name'];
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  handleSubmit() {
    if (!this.isSubmitted) this.isSubmitted = true;

    if (!this.form.valid) return;

    let data = this.form.value as Label;

    this.contactService
      .createLabel(data)
      .subscribe(({ message, data: { label } }) => {
        this.showSnackBar(message);
        // this.dialogRef.close();
        this.labelCreated.emit(label); // Emit the created label
        this.dialogRef.close();
      });
  }
}
