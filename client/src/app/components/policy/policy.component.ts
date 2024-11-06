import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css'
})
export class PolicyComponent implements OnInit {
  constructor(private globalService: GlobalService) { }
  COMPANY_NAME = this.globalService.COMPANY_NAME;
  EMAIL = this.globalService.EMAIL;
  DOMAIN = this.globalService.DOMAIN;

  ngOnInit() { }
}
