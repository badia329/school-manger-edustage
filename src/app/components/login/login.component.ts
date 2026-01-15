import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [BannerComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  loginForm!: FormGroup;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      password: ['', [Validators.required]],
    });
  }

login() {
  if (this.loginForm.invalid) {
    this.error = 'Required fields';
    return;
  }

  const data = {
    tel: this.loginForm.value.tel,
    password: this.loginForm.value.password,
  };

  this.auth.login(data).subscribe(
    (res: any) => {
      
      if (res.isLogged) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);

        if (res.role == 'admin') {
          this.router.navigate(['/dashboardAdmin']);
        } else if (res.role == 'teacher') {
          if (res.isValidation) {
            this.router.navigate(['/dashboardTeacher']);
          } else {
            this.error = 'not validation ';
            localStorage.removeItem('token');
            localStorage.removeItem('role');
          }
        } else if (res.role == 'student') {
          this.router.navigate(['/dashboardStudent']);
        } else if (res.role == 'parent') {
        }
      } else {
        this.error = res.msg; 
      }
    },
    (err) => {
      this.error = "Connection Error";
    }
  );
}
}
