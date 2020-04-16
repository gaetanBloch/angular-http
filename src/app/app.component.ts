import { Component, OnDestroy, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostService } from './post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  errorSubject = new Subject<HttpErrorResponse>();
  errorRead: HttpErrorResponse = null;
  errorWrite: HttpErrorResponse = null;
  errorSubscription: Subscription;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.errorSubscription = this.errorSubject.subscribe(error => this.errorWrite = error);
    this.fetchPosts();
  }

  onCreatePost(postData: Post): void {
    this.postService.createPost(postData).subscribe(
      () => this.fetchPosts(),
      (error: HttpErrorResponse) => this.errorSubject.next(error));
  }

  onFetchPosts(): void {
    this.fetchPosts();
  }

  onClearPosts(): void {
    this.postService.deletePosts().subscribe(() => this.loadedPosts = []);
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, (error: HttpErrorResponse) => {
      this.isFetching = false;
      this.errorRead = error;
    });
  }
}
