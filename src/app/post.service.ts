import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {
  }

  createPost(post: Post) {
    this.http
      .post<{ name: string }>('https://angular-http-4f890.firebaseio.com/posts.json', post)
      .subscribe(response => console.log(response));
  }

  fetchPosts() {
    return this.http
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
