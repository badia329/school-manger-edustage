import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BannerComponent } from '../../banner/banner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BannerComponent, FormsModule],
  templateUrl: './parent-signup.component.html',
  styleUrl: './parent-signup.component.css',
})
export class ParentSignupComponent {
  parentForm: FormGroup;
  errorMessage: string = '';
  childrenPhones: string[] = [''];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.parentForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        address: ['', [Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  addChild() {
    this.childrenPhones.push('');
  }

  removeChild(index: number) {
    if (this.childrenPhones.length > 1) {
      this.childrenPhones.splice(index, 1);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  passwordMatchValidator(control: any) {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  signup() {
    if (this.parentForm.valid) {
      
      let allPhonesValid = true;
      for (let i = 0; i < this.childrenPhones.length; i++) {
        const phone = this.childrenPhones[i];
        if (phone.length !== 8) {
          allPhonesValid = false;
          break;
        }
      }

      if (allPhonesValid === false) {
        this.errorMessage = 'All children phone numbers must be 8 digits.';
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const notFoundPhones: string[] = [];
      
      for (let i = 0; i < this.childrenPhones.length; i++) {
        const childPhone = this.childrenPhones[i];
        let found = false;

        for (let j = 0; j < users.length; j++) {
          if (users[j].role === 'student' && users[j].tel === childPhone) {
            found = true;
            break;
          }
        }

        if (found === false) {
          notFoundPhones.push(childPhone);
        }
      }

      if (notFoundPhones.length > 0) {
        this.errorMessage = 'These phone numbers not found: ' + notFoundPhones.join(', ');
        return;
      }

      let emailExists = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === this.parentForm.value.email) {
          emailExists = true;
          break;
        }
      }

      if (emailExists) {
        this.errorMessage = 'Email already exists.';
        return;
      }

      const newParent = {
        firstName: this.parentForm.value.firstName,
        lastName: this.parentForm.value.lastName,
        email: this.parentForm.value.email,
        tel: this.parentForm.value.tel,
        address: this.parentForm.value.address,
        childrenPhones: this.childrenPhones,
        password: this.parentForm.value.password,
        confirmPassword: this.parentForm.value.confirmPassword,
        id: String(Date.now()),
        role: 'parent',
      };

      users.push(newParent);
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }
}
