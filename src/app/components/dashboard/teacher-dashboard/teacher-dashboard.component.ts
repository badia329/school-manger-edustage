import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [BannerComponent, CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent {
  currentUser: any;
  allCourses: any = [];
  allStudents: any = [];
  courseAssignments: any = [];
  myCourses: any = [];

  constructor(private router: Router, private coursesService: CoursesService) {}

  ngOnInit() {
    this.myCourses = [];

    this.coursesService.getAllCourses().subscribe((data: any) => {
      console.log('Data from Backend:', data);

      for (let i = 0; i < data.tab.length; i++) {
        const course = data.tab[i];

        if (course.teacherId === this.currentUser.id) {
          this.myCourses.push({
            idCourse: course._id,
            name: course.name,
            description: course.description,
            duration: course.duration,
          });
        }
      }

      console.log('My Courses:', this.myCourses);
    });
  }

  // Navigate to add course page
  goToAddCourse() {
    this.router.navigate(['/addCourse']);
  }

  // View course details
  viewCourse(courseId: any) {
    this.router.navigate(['/infoCourse', courseId]);
  }

  // Edit course
  editCourse(courseId: any) {
    this.router.navigate(['/editCourse', courseId]);
  }

  // Delete course
  deleteCourse(courseId: any) {
    // Confirm before delete
    if (confirm('Are you sure you want to delete this course?')) {
      // Get courses from localStorage
      const coursesTab = JSON.parse(localStorage.getItem('courses') || '[]');

      // Find and remove the course
      for (let i = 0; i < coursesTab.length; i++) {
        if (coursesTab[i].idCourse == courseId) {
          coursesTab.splice(i, 1);
          break;
        }
      }

      // Save back to localStorage
      localStorage.setItem('courses', JSON.stringify(coursesTab));

      // Update local array
      this.allCourses = coursesTab;

      // Refresh my courses

      alert('Course deleted successfully!');
    }
  }

  // Give grade and evaluation to student
  giveGradeAndEvaluation(studentId: any, courseId: any) {
    // Navigate to grade page with student and course IDs
    this.router.navigate(['/grade', courseId, studentId]);

    // Or you can show a modal here
    console.log('Give grade to student:', studentId, 'in course:', courseId);
  }
}
