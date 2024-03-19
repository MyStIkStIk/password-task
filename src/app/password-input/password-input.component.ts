import { Component } from '@angular/core';
import { PasswordStrength } from '../enums/password-strength.enum';

@Component({
  selector: 'custom-password',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {
  password: string = '';
  passwordStr: PasswordStrength = PasswordStrength.None;
  inputType: string = 'password';
  errorMsg: string = '';

  easyMatch: RegExp = new RegExp('^(?:[A-Za-z]+|\\d+|[+\\-\\/=._@*]+)$');
  mediumMatch: RegExp = new RegExp('^[a-zA-Z0-9]+$|^[a-zA-Z+\\-\\/=_@*]+$|^[0-9+\\-\\/=_@*]+$');
  strongMatch: RegExp = new RegExp('^(?=.*\\d)(?=.*[A-Za-z])(?=.*[+\\-\\/=._@*]).+$');

  onChange() {
    this.checkPassword()
    this.appointErrorMessage();
  }

  checkPassword() {
    if (this.password.length >= 8) {
      if (this.easyMatch.test(this.password))
        this.passwordStr = PasswordStrength.Easy;
      else if (this.mediumMatch.test(this.password))
        this.passwordStr = PasswordStrength.Medium;
      else if (this.strongMatch.test(this.password))
        this.passwordStr = PasswordStrength.Strong;
      else
        this.passwordStr = PasswordStrength.Wrong;
    }
    else
      this.passwordStr = PasswordStrength.None;
  }

  appointErrorMessage() {
    if (this.password.length < 8 && this.password.length > 0)
      this.errorMsg = 'Password must be at least 8 characters long.';
    else if (this.passwordStr === PasswordStrength.Wrong)
      this.errorMsg = "Password must contain only letters/numbers or '+-=._@*'.";
    else
      this.errorMsg = '';
  }

  toggleInputType() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }
}
