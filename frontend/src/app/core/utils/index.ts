export const cookie = {
  set: ({
    name,
    value,
    hours,
  }: {
    name: string;
    value: string;
    hours: number;
  }): void => {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + hours * 60 * 60 * 1000);
    const expires = `; expires=${expireDate.toUTCString()}`;
    document.cookie = `${name}=${value}${expires}; path=/`;
  },

  // Get the value of a cookie by its name
  get: (name: string): string | null => {
    // Use a regular expression to find the cookie value in the document.cookie string
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    // Return the cookie value or null if not found
    return match ? match[2] : null;
  },

  // Remove a cookie by setting its expiration date to a past date
  remove: (name: string): void => {
    // Set the cookie's expiration date to a past date to remove it
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  },
};

import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordStrength() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
      const passwordValid =
        hasUpperCase &&
        hasLowerCase &&
        hasNumeric &&
        hasSpecial &&
        value.length >= 8;
      return !passwordValid ? { passwordStrength: true } : null;
    };
  }
}
