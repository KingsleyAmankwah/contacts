import { Component, OnInit } from '@angular/core';
import { ContactDetail } from '../../interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../service/contact.service';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../core/components/input/input.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [MatIconModule, InputComponent],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css',
})
export class EditContactComponent implements OnInit {
  contactId!: string;
  contactDetail = {} as ContactDetail;
  isSubmitted = false;
  isReadOnly = false;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  closeForm() {
    this.router.navigateByUrl('/contact/list');
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('contactId');
      // console.log('Contact ID:', id);

      if (id !== null) {
        this.contactId = id;

        // Fetch contact details based on the ID
        this.contactService.getContactById(this.contactId).subscribe(
          (data) => {
            this.contactDetail = data.data.contact;

            this.form.patchValue({
              firstName: this.contactDetail.firstName,
              lastName: this.contactDetail.lastName,
              nickName: this.contactDetail.nickName,
              company: this.contactDetail.company,
              jobTitle: this.contactDetail.jobTitle,
              department: this.contactDetail.department,
              email: this.contactDetail.email,
              phone: this.contactDetail.phone,
              country: this.contactDetail.country,
              addressLine1: this.contactDetail.addressLine1,
              addressLine2: this.contactDetail.addressLine2,
              state: this.contactDetail.state,
              city: this.contactDetail.city,
              pincode: this.contactDetail.pincode,
              birthday: this.contactDetail.birthday,
              website: this.contactDetail.website,
              notes: this.contactDetail.notes,
            });
            // console.log('Fetching works!');
          },
          (error) => {
            // console.error('Error fetching contact details:', error);
          }
        );
      } else {
        // console.log("Fetching doesn't work!");
      }
    });
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
      Validators.pattern(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/
      ),
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

  updateContact() {
    if (this.form.valid) {
      this.isLoading = true;

      const formData = this.form.value as ContactDetail;

      this.contactService.updateContactById(this.contactId, formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigateByUrl('/contact/list');
          this.isSubmitted = true;
          // Check if the response has a message
          if (response.message) {
            this.showSnackBar(response.message);
          }
        },
        (error) => {
          this.isLoading = false;

          if (error.error && error.error.message) {
            this.showSnackBar(error.error.message);
          } else {
            this.showSnackBar('An error occurred while updating the contact.');
          }
        }
      );
    } else {
      this.isSubmitted = true;
    }
  }
}
