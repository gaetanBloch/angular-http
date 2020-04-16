import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  errorSubject = new Subject<HttpErrorResponse>();

  constructor(private http: HttpClient) {
  }

  createPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string; }>(
      'https://angular-http-4f890.firebaseio.com/posts.json',
      post
    ).pipe(
      catchError(error => {
        this.errorSubject.next(error);
        return throwError(error);
      })
    );
  }

  fetchPosts(): Observable<Post[]> {
    // Several query parameters to add
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('key', 'value');

    return this.http
      .get<{ [key: string]: Post }>('https://angular-http-4f890.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'custom-header': 'hello'}),
          // params: new HttpParams().set('print', 'pretty')
          params: searchParams
        })
      .pipe(
        map(response => {
          const posts: Post[] = [];
          if (response) {
            for (const key of Object.keys(response)) {
              posts.push({...response[key], id: key});
            }
          }
          return posts;
        }),
        catchError(error => {
          // Do some analytics
          return throwError(error);
        })
      );
  }

  deletePosts(): Observable<unknown> {
    return this.http.delete('https://angular-http-4f890.firebaseio.com/posts.json');
  }
}
