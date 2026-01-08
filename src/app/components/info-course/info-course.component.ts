import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-info-course',
  imports: [BannerComponent, CommonModule],
  templateUrl: './info-course.component.html',
  styleUrl: './info-course.component.css',
})
export class InfoCourseComponent {
  obj: any = {};

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    const coursesTab = JSON.parse(localStorage.getItem('courses') || '[]');

    for (let i = 0; i < coursesTab.length; i++) {
      if (coursesTab[i].idCourse == id) {
        this.obj = coursesTab[i];
        break;
      }
    }
  }
}
