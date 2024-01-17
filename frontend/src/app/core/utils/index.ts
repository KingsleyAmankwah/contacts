export const cookie = {
  // Set a cookie with the given name, value, and expiration days
  set: ({
    name,
    value,
    days,
  }: {
    name: string;
    value: string;
    days: number;
  }): void => {
    // Create a new Date object for the expiration date
    const expireDate = new Date();
    // Set the expiration date by adding the specified number of days
    expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
    // Format the expires string with the UTC time of the expiration date
    const expires = `; expires=${expireDate.toUTCString()}`;
    // Set the cookie with the provided name, value, and expiration settings
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
