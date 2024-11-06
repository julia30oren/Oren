import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  constructor(private globalService: GlobalService, private router: Router) { }

  posts: any;

  openPost(event: any) {
    let post_id = Number(event.srcElement.id);

    this.posts.forEach((element: any) => {
      if (element.id == post_id) {
        this.globalService.metaPost(element);
        this.router.navigate(['/post/' + element.id]);
      }
    });
  }

  ngOnInit(): void {
    this.globalService.getAllPosts().subscribe(r => {
      this.posts = r;
    });
  }
}
