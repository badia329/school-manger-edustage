import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-course-info',
  imports: [CommonModule],
  templateUrl: './course-info.component.html',
  styleUrl: './course-info.component.css',
})
export class CourseInfoComponent {
  courseAssignments: any = [];
  currentUser: any = null;
  myCourse: any = [];
  grades: any = [];

  constructor() {}

  ngOnInit() {
    this.courseAssignments = JSON.parse(localStorage.getItem('courseAssignments') || '[]');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.grades = JSON.parse(localStorage.getItem('grades') || '[]'); 

    this.loadData();
  }

  loadData() {
    if (!this.currentUser || !this.currentUser.id) return;
    
    const studentId = this.currentUser.id;
    this.myCourse = [];

    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    for (let i = 0; i < this.courseAssignments.length; i++) {
      const assignment = this.courseAssignments[i];

      // استخدام "==" بدلاً من "===" لتجنب مشاكل (string vs number)
      if (assignment.students && assignment.students.includes(studentId)) {
        
        // جلب اسم الكورس
        let courseName = 'Unknown';
        for (let j = 0; j < courses.length; j++) {
          if (courses[j].idCourse == assignment.courseId) {
            courseName = courses[j].name;
            break;
          }
        }

        // جلب اسم المعلم
        let teacherName = 'Unknown';
        for (let j = 0; j < users.length; j++) {
          if (users[j].id == assignment.teacherId) {
            teacherName = users[j].firstName + ' ' + users[j].lastName;
            break;
          }
        }

        // جلب العلامة والتقييم
        let gradeValue = 'N/A'; // قيمة افتراضية في حال لم توجد درجة
        let evaluationValue = 'No evaluation yet';
        for (let j = 0; j < this.grades.length; j++) {
          const g = this.grades[j];
          if (g.studentId == studentId && g.courseId == assignment.courseId) {
            gradeValue = g.grade;
            evaluationValue = g.evaluation;
            break;
          }
        }

        this.myCourse.push({
          ...assignment,
          courseName,
          teacherName,
          grade: gradeValue,
          evaluation: evaluationValue
        });
      }
    }
  }
}
