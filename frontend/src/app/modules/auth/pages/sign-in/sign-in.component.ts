import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SignInData } from '../../Interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  loginForm!: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  toast = inject(ToastrService);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const signInData: SignInData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.signIn(signInData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          this.toast.success(response.message, 'Success');
          this.router.navigate(['/contact/list']);
        },
        error: (error) => {
          this.errorMessage = error;
          this.isLoading = false;
          // console.error('Sign up error:', error);
          this.toast.error(error.error.message, 'Error');
          // Optionally reset form or handle error specific UI changes here.
        },
      });
    }
  }
}
