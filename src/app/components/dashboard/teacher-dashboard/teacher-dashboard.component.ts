import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [BannerComponent, CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent {
  constructor(private router: Router) {}
  courses = JSON.parse(localStorage.getItem('courses') || '[]');
  students = JSON.parse(localStorage.getItem('users') || '[]');
  infoCourse(id: number) {
    this.router.navigate(['/infoCourse', id]);
  }
  editCourse(id: number) {
    this.router.navigate(['/editCourse', id]);
  }
  deleteCourse(id: string) {
    const coursesTab = JSON.parse(localStorage.getItem('courses') || '[]');

    for (let i = 0; i < coursesTab.length; i++) {
      if (coursesTab[i].idCourse === id) {
        coursesTab.splice(i, 1);
        break;
      }
    }
    console.log('delete succes', coursesTab);
    localStorage.setItem('courses', JSON.stringify(coursesTab));
    this.courses = coursesTab;
  }
}
