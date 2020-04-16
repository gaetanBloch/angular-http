import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http
      .post<{ name: string }>('https://angular-http-4f890.firebaseio.com/posts.json', postData)
      .subscribe(response => console.log(response));
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>('https://angular-http-4f890.firebaseio.com/posts.json')
      .pipe(map(response => {
        const posts: Post[] = [];
        for (const key of Object.keys(response)) {
          posts.push({...response[key], id: key});
        }
        return posts;
      }))
      .subscribe(posts => console.log(posts));
  }
}
