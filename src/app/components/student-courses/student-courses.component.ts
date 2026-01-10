import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-courses',
  imports: [CommonModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css'
})
export class StudentCoursesComponent {
 courseAssignments: any = [];
  currentUser: any = null;
  myCourse: any = [];
  grades: any = [];

  constructor() {}

  ngOnInit() {
    this.courseAssignments = JSON.parse(localStorage.getItem('courseAssignments') || '[]');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.grades = JSON.parse(localStorage.getItem('grades') || '[]'); // مهم جداً جلب الدرجات

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

      if (assignment.students && assignment.students.includes(studentId)) {
        
        let courseName = 'Unknown';
        for (let j = 0; j < courses.length; j++) {
          if (courses[j].idCourse == assignment.courseId) {
            courseName = courses[j].name;
            break;
          }
        }

        let teacherName = 'Unknown';
        for (let j = 0; j < users.length; j++) {
          if (users[j].id == assignment.teacherId) {
            teacherName = users[j].firstName + ' ' + users[j].lastName;
            break;
          }
        }

        let gradeValue = 'N/A'; 
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
