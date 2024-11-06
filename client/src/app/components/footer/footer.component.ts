import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  constructor(private globalService: GlobalService) { }
  e_empty: boolean = true;
  e_invalid: boolean = true;
  e_thanks: boolean = true;
  e_pattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  emailCheck(f: NgForm) {
    if (f.value.user_email) {
      this.e_empty = true;
      this.e_invalid = false;
    } else {
      this.e_empty = false;
      this.e_invalid = true;
    }
  }

  submitEmail(f: NgForm) {
    this.e_thanks = true;
    if (f.valid) {
      this.e_empty = true;
      this.e_invalid = true;
      if (f.value.user_email.match(this.e_pattern)) {
        this.globalService.connectionRequest(f.value.user_email, f.value.email_text).subscribe((p: any) => {
          console.log(p)
          if (p.result === 'email has been sent successfully') {
            this.e_thanks = false;
          }
        })
      } else this.emailCheck(f);
    } else this.emailCheck(f);
  }
}
