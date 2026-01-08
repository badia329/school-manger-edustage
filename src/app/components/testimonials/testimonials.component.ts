import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
      if ($('.testi_slider').length) {
        $('.testi_slider').owlCarousel({
          loop: true,
          margin: 30,
          items: 2,
          nav: false,
          autoplay: true,
          autoplayTimeout: 2500,
          smartSpeed: 1500,
          dots: true,
          responsive: {
            0: { items: 1 },
            991: { items: 2 }
          }
        });
      }
    }
  }
}