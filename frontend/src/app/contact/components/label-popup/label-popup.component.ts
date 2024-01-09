import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../../../core/components/input/input.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-label-popup',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './label-popup.component.html',
  styleUrl: './label-popup.component.css',
})
export class LabelPopupComponent {
  dialogRef = inject(MatDialogRef<LabelPopupComponent>);

  formBuilder = inject(FormBuilder);
  isSubmitted = false;

  form = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  get name() {
    return this.form.controls['name'];
  }

  handleSubmit() {
    if (!this.isSubmitted) this.isSubmitted = true;
    if (!this.form.valid) return;
  }
}
