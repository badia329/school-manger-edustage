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
import { AuthService } from '../../../services/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
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
    if (this.teacherForm.invalid) {
      this.errorMessage = 'Please check the form and upload your CV';
      return;
    }

    const teacherData = {
      firstName: this.teacherForm.value.firstName,
      lastName: this.teacherForm.value.lastName,
      email: this.teacherForm.value.email,
      tel: this.teacherForm.value.tel,
      address: this.teacherForm.value.address,
      password: this.teacherForm.value.password,
      specialty: this.teacherForm.value.specialty,
      cv: this.teacherForm.value.cv,
    };

    console.log('Sending Teacher data:', teacherData);

    this.authService.signupTeacher(teacherData).subscribe((data) => {
      console.log('Response from server:', data);

      if (data.isAdded) {
        this.successMessage = data.msg;
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = data.msg;
      }
    });
  }
}
