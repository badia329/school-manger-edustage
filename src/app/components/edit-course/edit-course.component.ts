import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  imports: [FormsModule, BannerComponent, CommonModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css',
})
export class EditCourseComponent {
obj: any = {};
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    console.log("this id", id);
    const coursesTab = JSON.parse(localStorage.getItem('courses') || '[]');
    for (let i = 0; i < coursesTab.length; i++) {
      if (coursesTab[i].idCourse == id) {
        this.obj = coursesTab[i];
        console.log("this data obj", this.obj);
        break;
      }
    }
  }
  editCourse(courseForm:any) {
    const coursesTab = JSON.parse(localStorage.getItem('courses') || '[]');
    for (let i = 0; i < coursesTab.length; i++) {
      if (coursesTab[i].idCourse == this.obj.idCourse) {
        coursesTab[i] = this.obj;
        break;
      }
    }
    localStorage.setItem('courses', JSON.stringify(coursesTab));
        console.log("this data new obj", this.obj);

    this.router.navigate(['dashboardTeacher']);
  }

}
