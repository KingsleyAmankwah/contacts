import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SignUpData } from '../../Interface';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  registerForm!: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const signUpData: SignUpData = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.authService.signUp(signUpData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          this.router.navigate(['/contact/list']);
        },
        error: (error) => {
          this.errorMessage = error;
          this.isLoading = false;
          console.error('Sign up error:', error);
          // Optionally reset form or handle error specific UI changes here.
        },
      });
    }
  }
}
