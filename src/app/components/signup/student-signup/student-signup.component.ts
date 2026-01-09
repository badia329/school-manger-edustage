import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BannerComponent } from '../../banner/banner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BannerComponent],
  templateUrl: './student-signup.component.html',
  styleUrl: './student-signup.component.css',
})
export class StudentSignupComponent {
  studentForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.studentForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        address: ['', [Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        // image: ['', Validators.required], // Photo de profil
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(control: any) {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    if (password !== confirm) {
      return { passwordMismatch: true };
    }
    return null;
  }

  signup() {
    if (this.studentForm.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      let emailExists = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === this.studentForm.value.email) {
          emailExists = true;
          break;
        }
      }

      if (emailExists) {
        this.errorMessage = 'Email already exists.';
        return;
      }

      const newStudent = {
        ...this.studentForm.value,
        id: String(Date.now()),
        role: 'student',
      };

      users.push(newStudent);
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Student registered successfully!', this.studentForm.value);
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }
}
