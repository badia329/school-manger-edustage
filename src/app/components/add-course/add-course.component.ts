import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-course',
  imports: [BannerComponent, FormsModule, CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent {
  addCourse(courseForm: any) {
    if (courseForm.valid) {
      const courses = JSON.parse(localStorage.getItem('courses') || '[]');
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

      const newCourse = {
        idCourse: Date.now(),
        name: courseForm.value.name,
        description: courseForm.value.description,
        duration: courseForm.value.duration,
        type: courseForm.value.type,
        teacherId: currentUser.id 
      };

      courses.push(newCourse);

      localStorage.setItem('courses', JSON.stringify(courses));

      courseForm.resetForm();

      console.log('Course added successfully!', newCourse);
      alert('Course added successfully!');
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
