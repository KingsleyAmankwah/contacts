import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SignUpData } from '../../Interface';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../layout/custom-button/custom-button.component';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    CustomButtonComponent,
    CustomInputComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  errorMessage = '';
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  registerForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z]+$'),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z]+$'),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$/
        ),
      ],
    ],
    confirmPassword: ['', [this.confirmPasswordValidator]],
  });

  private confirmPasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (!control.parent) {
      return null;
    }
    const password = control.parent.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  formControlName(name: string) {
    return this.registerForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const signUpData: SignUpData = {
        firstName: this.registerForm.value.firstName!,
        lastName: this.registerForm.value.lastName!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      };

      this.authService.signUp(signUpData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          this.toast.success(response.message, 'Success');
          this.router.navigate(['/contact/list']);
        },
        error: (error) => {
          this.errorMessage = error;
          this.isLoading = false;
          this.toast.error(error.error.message, 'Error');
        },
      });
    }
  }

  inputs = [
    {
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your firstname',
      control: 'firstName',
      errorMessage: {
        required: 'First name is required',
        pattern: 'First name should contain only alphabets',
        minlength: 'First name should contain atleast 2 characters',
      },
    },

    {
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      control: 'lastName',
      errorMessage: {
        required: 'Last name is required',
        pattern: 'Last name should contain only alphabets',
        minlength: 'Last name should contain atleast 2 characters',
      },
    },

    {
      type: 'email',
      label: 'Email',
      control: 'email',
      placeholder: 'Enter your email address',
      errorMessage: {
        required: 'Email is required',
        email: 'Invalid email address',
        pattern: 'Invalid email address',
      } as Record<string, string>,
    },

    {
      type: 'password',
      label: 'Password',
      control: 'password',
      placeholder: '••••••••',
      errorMessage: {
        required: 'Password is required',
        pattern:
          'Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number',
      } as Record<string, string>,
    },

    {
      type: 'password',
      label: 'Confirm Password',
      control: 'confirmPassword',
      placeholder: '••••••••',
      errorMessage: {
        required: 'Confirm your password',
        passwordMismatch: 'The two passwords do not match',
      } as Record<string, string>,
    },
  ];
}
