import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/posts.model';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {
  postsArr: Post[];
  constructor(public PostService: PostService) {

  }

  ngOnInit(): void {
    this.postsArr = this.PostService.getPosts()
  }

  postClickEvent(post) {
    console.log(post)
  }

}
