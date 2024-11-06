import { Component, OnInit } from '@angular/core';
import { GlobalService } from './global.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  constructor(private globalService: GlobalService, private scroller: ViewportScroller) { }
  title = this.globalService.COMPANY_NAME;
  date = new Date();

  ngOnInit() {
    this.globalService.getAllPosts();
   }
}
