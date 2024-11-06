import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css'
})

export class TermsComponent implements OnInit {
  constructor(private globalService: GlobalService) { }
  COMPANY_NAME = this.globalService.COMPANY_NAME;
  EMAIL = this.globalService.EMAIL;
  DOMAIN = this.globalService.DOMAIN;

  ngOnInit() { }
}