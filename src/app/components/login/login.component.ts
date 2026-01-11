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
      this.error = 'Champs obligatoires';
      return;
    }

    const data = {
      tel: this.loginForm.value.tel,
      password: this.loginForm.value.password,
    };

    this.auth.login(data).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);

        switch (res.role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'teacher':
            this.router.navigate(['/teacher']);
            break;
          case 'student':
            this.router.navigate(['/student']);
            break;
          case 'parent':
            this.router.navigate(['/home']);
            break;
        }
      },
      error: (err) => {
        this.error = err.error.msg;
      },
    });
  }
}
