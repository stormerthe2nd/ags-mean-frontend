import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/posts.model';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit, OnDestroy {
  postsArr: Post[];
  private postSub: Subscription
  constructor(public PostService: PostService) {

  }

  ngOnInit(): void {
    this.PostService.getPosts()
    this.postSub = this.PostService.postArrUpdatedListener().subscribe((postsArr: Post[]) => {
      this.postsArr = postsArr
      console.log(this.postsArr)
    })
  }
  ngOnDestroy(): void {
    this.postSub.unsubscribe()
  }

  postClickEvent(post) {
  }

}
