import { Component } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private globalService: GlobalService) { }

  // scroll() {
  //   this.globalService.scrollToContactsFunction();
  // }

  scroll() {
}
}