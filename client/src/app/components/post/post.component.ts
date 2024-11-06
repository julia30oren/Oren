import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface postInterface {
  p_id: number | null,
  post_title: string,
  post_img_url: string,
  post_description: string,
  created_date: string,
  post_likes: number,
  post_tweets: number | null,
  post_shares: number | null,
  post_views: number | null,
  extra: any[]
};

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  post: postInterface = {
    p_id: null,
    post_title: '',
    post_img_url: '',
    post_description: '',
    created_date: '',
    post_likes: 0,
    post_tweets: null,
    post_shares: null,
    post_views: null,
    extra: []
  }
  url: any;

  constructor(private globalService: GlobalService,
    public activatedRoute: ActivatedRoute,
    private router: Router) {
    activatedRoute.url.subscribe(url => {
      this.url = url[1].path;
    });
  }

  dom = this.globalService.DOMAIN;

  actionDo(action: string, event: any) {
    this.globalService.newAction(action, this.url).subscribe((p: any) => {
              console.log(p);
      if (action === 'like' && p.affectedRows === 1) {
        event.target.disabled = true;
        this.post.post_likes += 1;
      }
      else if (action === 'tweet' && p.affectedRows === 1) {
        this.post.post_tweets ? this.post.post_tweets += 1 : this.post.post_tweets = 1;
      }
      else if (action === 'share' && p.affectedRows === 1) {
        this.post.post_shares ? this.post.post_shares += 1 : this.post.post_shares = 1;
      }
      else if (!p) {
        this.router.navigate(['**']);
      }
      else {
        console.log(p);
      }
    });
  }

  ngOnInit(): void {
    this.globalService.getPostById('post', this.url).subscribe((r: any) => {
      let temp_p: any = r[0];
      if (temp_p) {
        this.post = {
          p_id: temp_p.id,
          post_title: temp_p.post_title ? temp_p.post_title : '',
          post_img_url: temp_p.post_img_url ? temp_p.post_img_url : '',
          post_description: temp_p.post_description ? temp_p.post_description : '',
          created_date: temp_p.created_date ? temp_p.created_date : '',
          post_likes: temp_p.post_likes,
          post_tweets: temp_p.post_tweets,
          post_shares: temp_p.post_shares,
          post_views: temp_p.post_views,
          extra: []
        }
        r.forEach((element: any) => {
          let arr: any = {};
          arr.el_type = element.el_type;
          arr.el_value = element.el_value;
          this.post.extra.push(arr);
        });
        this.actionDo('view', '');
        this.globalService.metaPost(this.post);
      } else this.router.navigate(['**']);
    });
  }
}
