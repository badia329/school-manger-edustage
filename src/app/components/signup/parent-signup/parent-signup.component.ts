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
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-parent-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BannerComponent],
  templateUrl: './parent-signup.component.html',
  styleUrl: './parent-signup.component.css',
})
export class ParentSignupComponent {
  parentForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
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
    if (this.parentForm.invalid) {
      this.errorMessage =
        'Please check the form and provide your child phone number';
      return;
    }

    const parentData = {
      firstName: this.parentForm.value.firstName,
      lastName: this.parentForm.value.lastName,
      email: this.parentForm.value.email,
      tel: this.parentForm.value.tel,
      address: this.parentForm.value.address,
      password: this.parentForm.value.password,
      childPhone: this.parentForm.value.childTel,
    };

    console.log('Sending Parent data:', parentData);

    this.authService.signupParent(parentData).subscribe((data) => {
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
