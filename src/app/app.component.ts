import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostService } from './post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  errorRead: HttpErrorResponse = null;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createPost(postData).subscribe(() => this.fetchPosts());
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => this.loadedPosts = []);
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
