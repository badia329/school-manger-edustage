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
  selector: 'app-student-signup',
  imports: [ReactiveFormsModule, CommonModule, BannerComponent],
  templateUrl: './student-signup.component.html',
  styleUrl: './student-signup.component.css',
})
export class StudentSignupComponent {
  studentForm: FormGroup;
  errorMessage: string = '';
  success: string = '';
  selectedImage: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.studentForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        address: ['', [Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        image: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      // Store the actual file object, not just the filename
      this.studentForm.patchValue({ image: file });
    }
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
    if (this.studentForm.invalid) {
      this.errorMessage = 'Please check the form';
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.studentForm.value.firstName);
    formData.append('lastName', this.studentForm.value.lastName);
    formData.append('email', this.studentForm.value.email);
    formData.append('tel', this.studentForm.value.tel);
    formData.append('address', this.studentForm.value.address);
    formData.append('password', this.studentForm.value.password);

    const imageFile = this.studentForm.get('image')?.value;
    if (imageFile) {
      formData.append('image', imageFile);
    }

    this.authService.signupStudent(formData).subscribe((data) => {
      console.log('Response from server:', data);

      if (data.isAdded) {
        this.success = data.msg;
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = data.msg;
      }
    });
  }
}
