import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() { }

  isLetter(c: string): boolean {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
  }

  isValidPassword(password: string): boolean {
    if (password.length < 8) {
      return false;
    }
    if (password.length > 12) {
      return false;
    }

    var numUpper = password.length - password.replace(/[A-Z]/g, '').length;
    if (numUpper < 1) {
      return false;
    }

    var numLower = password.length - password.replace(/[a-z]/g, '').length;
    if (numLower < 3) {
      return false;
    }

    var numDigits = password.length - password.replace(/[0-9]/g, '').length;
    if (numDigits < 2) {
      return false;
    }

    var numSpecialSigns = password.length - numUpper - numLower - numDigits;
    if (numSpecialSigns < 2) {
      return false;
    }

    if (!this.isLetter(password.charAt(0))) {
      return false;
    }

    for (let i = 0; i < password.length - 2; i++) {
      if (this.isLetter(password.charAt(i)) && this.isLetter(password.charAt(i + 1)) && this.isLetter(password.charAt(i + 2))) {
        return false;
      }
    }

    return true;
  }

  isValidChangedPassword(oldPassword:string, newPassword: string): boolean {
    if (oldPassword == newPassword) {
      return false;
    }

    return this.isValidPassword(newPassword);
  }
}
