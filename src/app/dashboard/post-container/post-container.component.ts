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
  categories = this.PostService.categories()
  private postSub: Subscription
  constructor(public PostService: PostService) {

  }

  ngOnInit(): void {
    this.PostService.getPosts()
    this.postSub = this.PostService.postArrUpdatedListener().subscribe((postsArr: Post[]) => {
      this.postsArr = postsArr
    })
  }
  ngOnDestroy(): void {
    this.postSub.unsubscribe()
  }

  filterCategories(cat, arr) {
    if (arr === undefined) return
    return arr.some(post => post.category === cat);
  }

}
