import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SignUpData } from '../../Interface';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../../core/utils';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
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
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$'),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, CustomValidators.passwordStrength()]],
    confirmPassword: [
      '',
      [Validators.required, CustomValidators.passwordStrength()],
    ],
  });

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  passwordsMatch() {
    return (
      this.confirmPassword?.touched &&
      this.password?.value === this.confirmPassword?.value
    );
  }

  passwordsMismatch() {
    return (
      this.registerForm.get('confirmPassword')?.touched &&
      this.password?.value !== this.confirmPassword?.value
    );
  }

  showErrorMessage() {
    if (this.passwordsMismatch()) {
      this.errorMessage = 'The two passwords do not match!';
      return true;
    }

    this.errorMessage = '';
    return false;
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
          // console.error('Sign up error:', error);
        },
      });
    }
  }
}
