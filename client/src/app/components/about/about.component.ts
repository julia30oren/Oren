import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})

export class AboutComponent implements OnInit {
 constructor(private globalService: GlobalService){}
  ifInteger(num: number) {
    return num % 2 === 0 ? true : false;
  }

  scrollIndicator() {
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    var bar = document.getElementById('myBar');
    if (bar) {
      bar.style.height = scrolled + '%';
    }
  }

  ngOnInit(): void {
  }
}
