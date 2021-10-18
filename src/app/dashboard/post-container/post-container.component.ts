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

  postsArr = [] as Post[];
  loading = true
  categories = this.PostService.categories()
  private postSub: Subscription
  constructor(public PostService: PostService) {
  }

  ngOnInit(): void {
    this.loadMoreCat()
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe()
  }

  loadMoreCat() {
    this.loading = true
    this.PostService.getPosts()
    this.postSub = this.PostService.postArrUpdatedListener().subscribe((postsArr: Post[]) => {
      this.loading = false
      this.postsArr = postsArr
    })
    this.PostService.loadIndex++
  }

  filterCategories(cat, arr) {
    if (arr === undefined) return
    return arr.some(post => post.category === cat);
  }
}
