import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerComponent } from '../../banner/banner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BannerComponent],
  templateUrl: './parent-signup.component.html',
  styleUrl: './parent-signup.component.css'
})
export class ParentSignupComponent {
  parentForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.parentForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        address: ['', [Validators.required, Validators.minLength(10)]],
        childTel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]], // خاص بالولي
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(control: any) {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  signup() {
    if (this.parentForm.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      let childExists = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].role === 'student' && users[i].tel === this.parentForm.value.childTel) {
          childExists = true;
          break;
        }
      }

      if (!childExists) {
        this.errorMessage = "Child's phone number not found in our student list.";
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
        ...this.parentForm.value,
        id: Date.now(),
        role: 'parent'
      };

      users.push(newParent);
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }
}