import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trainer',
  imports: [CommonModule],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css',
})
export class TrainerComponent {
  teachers: any = [];
  ngOnInit() {
    this.teachers = [];
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    for (let i = 0; i < users.length; i++) {
      if (users[i].role == 'teacher' && users[i].isValidated == true) {
        this.teachers.push(users[i]);
      }
    }
  }
}
