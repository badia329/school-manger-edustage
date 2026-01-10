import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  imports: [CommonModule],
})
export class CoursesComponent implements AfterViewInit {
  courses: any = [];
  ngAfterViewInit() {
    setTimeout(() => {
      this.initOwl();
    }, 50);
  }

  ngOnInit() {
    this.courses = JSON.parse(localStorage.getItem('courses') || '[]');
  }

  initOwl() {
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
      if ($('.active_course').length) {
        $('.active_course').owlCarousel({
          loop: true,
          margin: 20,
          items: 3,
          nav: true,
          autoplay: true,
          autoplayTimeout: 2500,
          smartSpeed: 1500,
          dots: false,
          navText: ["<img src='img/prev.png'>", "<img src='img/next.png'>"],
          responsive: {
            0: { items: 1, margin: 0 },
            991: { items: 2, margin: 30 },
            1200: { items: 3, margin: 30 },
          },
        });
      }
    }
  }
}
