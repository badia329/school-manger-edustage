import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [BannerComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const tel = this.loginForm.value.tel;
    const password = this.loginForm.value.password;

    let userFound = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].tel === tel && users[i].password === password) {
        userFound = users[i];
        break;
      }
    }

    if (userFound) {
      if (userFound.role === 'teacher' && !userFound.isValidated) {
        this.errorMessage = 'Your account is not validated by admin yet.';
        return;
      }

      console.log('Login successful:', userFound);
      localStorage.setItem('currentUser', JSON.stringify(userFound));

      if (userFound.role === 'teacher') {
        this.router.navigate(['/dashboardTeacher']);
      } else if (userFound.role === 'student') {
        this.router.navigate(['/dashboardStudent']);
      } else if (userFound.role === 'parent') {
        this.router.navigate(['/dashboardParent']);
      } else if (userFound.role === 'admin') {
        this.router.navigate(['/dashboardAdmin']);
      }
    } else {
      this.errorMessage = 'Phone number or password is incorrect.';
    }
  }
}
