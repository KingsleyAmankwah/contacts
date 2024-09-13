import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SignInData } from '../../Interface';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { CustomButtonComponent } from "../../layout/custom-button/custom-button.component";
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    CustomInputComponent,
    CustomButtonComponent
],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService
  ) {}

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required]],
  });

  formControlName(name: string) {
    return this.loginForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const signInData: SignInData = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this.authService.signIn(signInData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toast.success(response.message, 'Success');
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
      } as Record<string, string>,
    },
  ];
}
