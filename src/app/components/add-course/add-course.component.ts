import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-add-course',
  imports: [BannerComponent, FormsModule, CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent {
  obj: any = [];
  constructor(private coursesService: CoursesService) {}
  addCourse() {
    console.log('Here is Course Obj', this.obj);
    this.coursesService.addCourse(this.obj).subscribe((response) => {
      console.log('Here is response from BE after adding Course', response);
    });
  }
}
