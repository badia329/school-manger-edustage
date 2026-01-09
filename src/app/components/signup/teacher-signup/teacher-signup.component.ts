import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BannerComponent } from '../../banner/banner.component';

@Component({
  selector: 'app-teacher-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BannerComponent],
  templateUrl: './teacher-signup.component.html',
  styleUrl: './teacher-signup.component.css',
})
export class TeacherSignupComponent {
  teacherForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.teacherForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        address: ['', [Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        specialty: ['', Validators.required],
        // cv: ['', Validators.required],
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
    if (this.teacherForm.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      let emailExists = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === this.teacherForm.value.email) {
          emailExists = true;
          break;
        }
      }

      if (emailExists) {
        this.errorMessage = 'Email already exists. Please use another email.';
        console.log(this.errorMessage);
        return;
      }

      const newTeacher = {
        ...this.teacherForm.value,
        id: String(Date.now()),
        role: 'teacher',
        isValidated: false,
      };

      users.push(newTeacher);
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Teacher registered successfully!', this.teacherForm.value);
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
      console.log(this.errorMessage);
    }
  }
}
