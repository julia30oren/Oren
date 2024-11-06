import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class GlobalService implements OnInit {

  public COMPANY_NAME: string | undefined = process.env['NG_APP_COMPANY_NAME'];
  public SERVER_URL: string | undefined = process.env['NG_APP_SERVER_URL'];
  public DOMAIN: string | undefined = process.env['NG_APP_DOMAIN'];
  public PORT: string | undefined = process.env['NG_APP_SERVER_PORT'];
  public EMAIL: string | undefined = process.env['NG_APP_EMAIL'];

  constructor(
    private http: HttpClient,
    private meta: Meta) {
  }

  public metaPost(post: any) {
    if (post.length > 0) {
      post.updateTag({ name: 'url', content: ('https://' + this.DOMAIN + '/blog') });
      this.meta.updateTag({ name: 'title', content: post.post_title });
      this.meta.updateTag({ name: 'description', content: post.post_description });
      this.meta.updateTag({ name: 'image', content: post.post_img_url });
    }
  }

  public getAllPosts() {
    return this.http.get(this.SERVER_URL + 'posts');
  }

  public newAction(action: string, open_post_id: number) {
    return this.http.get(this.SERVER_URL + action + '/' + open_post_id);
  }

  public getPostById(action: string, open_post_id: number) {
    return this.http.get(this.SERVER_URL + action + '/' + open_post_id);
  }

  public connectionRequest(client_email: string, client_message: string) {
    if (!client_message){
      client_message = "Client did not left a message";
    }
    return this.http.get(this.SERVER_URL + 'connect/' + client_email + '/' + client_message);
  }

  ngOnInit(): void { }
}
