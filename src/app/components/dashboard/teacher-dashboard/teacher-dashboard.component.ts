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
  
  // Variables
  currentUser: any;
  allCourses: any = [];
  allStudents: any = [];
  courseAssignments: any = [];
  myCourses: any = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Get current user
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Get all data from localStorage
    this.allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    this.allStudents = JSON.parse(localStorage.getItem('users') || '[]');
    this.courseAssignments = JSON.parse(localStorage.getItem('courseAssignments') || '[]');
    
    // Get my courses with students
    this.getMyCourses();
  }

  // Get courses that belong to current teacher
  getMyCourses() {
    this.myCourses = [];

    // Step 1: Loop through all courses
    for (let i = 0; i < this.allCourses.length; i++) {
      const course = this.allCourses[i];
      
      // Check if this course belongs to current teacher
      if (course.teacherId == this.currentUser.id) {
        
        // Step 2: Find students for this course
        const courseStudents: any = [];
        
        // Loop through courseAssignments
        for (let j = 0; j < this.courseAssignments.length; j++) {
          const assignment = this.courseAssignments[j];
          
          // Check if assignment is for this course and this teacher
          if (assignment.courseId == course.idCourse && 
              assignment.teacherId == this.currentUser.id) {
            
            // Step 3: Get student details
            if (assignment.students && assignment.students.length > 0) {
              
              for (let k = 0; k < assignment.students.length; k++) {
                const studentId = assignment.students[k];
                
                // Find student in allStudents
                for (let m = 0; m < this.allStudents.length; m++) {
                  if (this.allStudents[m].id == studentId) {
                    courseStudents.push(this.allStudents[m]);
                    break;
                  }
                }
              }
            }
            
            break; // Found assignment for this course
          }
        }
        
        // Add course with its students to myCourses
        this.myCourses.push({
          idCourse: course.idCourse,
          name: course.name,
          description: course.description,
          duration: course.duration,
          students: courseStudents,
          studentsCount: courseStudents.length
        });
      }
    }

    console.log('My Courses:', this.myCourses);
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
      this.getMyCourses();
      
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