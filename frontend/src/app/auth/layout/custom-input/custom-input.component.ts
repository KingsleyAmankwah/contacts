import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
})
export class CustomInputComponent {
  @Input() type = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() control: FormControl | null = null;
  @Input() errorMessage: Record<string, string> = {};

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl();
    }
  }

  get hasError() {
    return this.control
      ? this.control.invalid && (this.control.touched || this.control.dirty)
      : false;
  }

  get errorType() {
    if (!this.control || !this.control.errors) return;
    return Object.keys(this.control.errors)[0];
  }
}
