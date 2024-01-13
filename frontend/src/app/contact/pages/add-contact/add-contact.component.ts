import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContactDetail } from '../../interface';
import { ContactService } from '../../service/contact.service';
import { FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from '../../../core/components/input/input.component';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [MatIconModule, InputComponent, NgIf],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css',
})
export class AddContactComponent {
  showImage!: boolean;
  contactDetail = {} as ContactDetail;
  isSubmitted = false;
  isReadOnly = false;
  isLoading = false;

  router = inject(Router);
  formBuilder = inject(FormBuilder);
  contactService = inject(ContactService);
  toast = inject(ToastrService);
  snackBar = inject(MatSnackBar);

  closeForm() {
    this.router.navigateByUrl('/contact/list');
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }
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
    nickName: this.formBuilder.control('', [Validators.minLength(3)]),

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

  saveContact() {
    if (this.form.valid) {
      this.isLoading = true;
      const formData = this.form.value as ContactDetail;

      this.contactService.createContact(formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigateByUrl('/contact/list');
          this.showSnackBar(response.message);
        },
        (error) => {
          console.error('Error saving contact', error);
          this.isLoading = false;
          this.showSnackBar(error.error.message);
        }
      );
    } else {
      // If the form is not valid, mark it as submitted to display error messages
      this.isSubmitted = true;
    }
  }
}
