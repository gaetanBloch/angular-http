import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {
  }

  createPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string; }>(
      'https://angular-http-4f890.firebaseio.com/posts.json',
      post
    );
  }

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post }>('https://angular-http-4f890.firebaseio.com/posts.json')
      .pipe(map(response => {
        const posts: Post[] = [];
        if (response) {
          for (const key of Object.keys(response)) {
            posts.push({...response[key], id: key});
          }
        }
        return posts;
      }));
  }

  deletePosts(): Observable<unknown> {
    return this.http
      .delete('https://angular-http-4f890.firebaseio.com/posts.json');
  }
}
