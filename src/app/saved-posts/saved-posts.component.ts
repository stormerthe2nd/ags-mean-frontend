import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../posts.model';

@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit {
  postsArr: Post[] = []
  loading = true
  constructor(public postService: PostService, router: Router) {
    if (!this.postService.user.email) {
      router.navigate(["/"])
      return
    }
    postService.getSavedPosts(postService.user?.email).then(data => {
      this.postsArr = data.postsArr
    })
  }

  ngOnInit(): void {
  }

}
