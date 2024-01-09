import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ContactDetail } from '../../interface';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../core/components/input/input.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [MatIconModule, InputComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  showImage!: boolean;
  contactDetail = {} as ContactDetail;
  isSubmitted = false;

  @Input() isReadOnly = false;
  @Output() onClose = new EventEmitter();

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    firstName: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]*$/),
    ]),

    lastName: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]*$/),
    ]),
    nickName: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]*$/),
    ]),

    company: this.formBuilder.control(''),
    jobTitle: this.formBuilder.control(''),
    department: this.formBuilder.control(''),
    email: this.formBuilder.control('', [Validators.email]),
    phone: this.formBuilder.control('', [
      Validators.required,
      Validators.pattern(
        /^(\+?[0-9]{1,4}[\s\-]?)?(\(?[0-9]{3}\)?|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/
      ),
    ]),

    country: this.formBuilder.control(''),
    addressLine1: this.formBuilder.control(''),
    addressLine2: this.formBuilder.control(''),
    state: this.formBuilder.control(''),
    city: this.formBuilder.control(''),
    pincode: this.formBuilder.control('', [Validators.pattern(/^\d{6}$/)]),
    birthday: this.formBuilder.control('', [
      Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
    ]),
    website: this.formBuilder.control('', [
      Validators.pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      ),
    ]),
    notes: this.formBuilder.control(''),
  });

  get firstName() {
    return this.form.controls['firstName'];
  }

  get lastName() {
    return this.form.controls['lastName'];
  }

  get nickName() {
    return this.form.controls['nickName'];
  }

  get company() {
    return this.form.controls['company'];
  }

  get jobTitle() {
    return this.form.controls['jobTitle'];
  }

  get department() {
    return this.form.controls['department'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get phone() {
    return this.form.controls['phone'];
  }

  get addressLine1() {
    return this.form.controls['addressLine1'];
  }

  get addressLine2() {
    return this.form.controls['addressLine2'];
  }

  get state() {
    return this.form.controls['state'];
  }

  get city() {
    return this.form.controls['city'];
  }

  get pincode() {
    return this.form.controls['pincode'];
  }

  get birthday() {
    return this.form.controls['birthday'];
  }

  get website() {
    return this.form.controls['website'];
  }

  get notes() {
    return this.form.controls['notes'];
  }

  get country() {
    return this.form.controls['country'];
  }
}
