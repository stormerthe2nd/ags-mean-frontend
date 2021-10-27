import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../posts.model';

@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit, OnDestroy {
  postsArr: Post[] = []
  userData = JSON.parse(localStorage.getItem("google_auth")) || {}
  render = false
  loadIndex = 0
  length = 0
  amt = 0
  loading = true
  postSub: Subscription
  constructor(public postService: PostService, public router: Router) {
    postService.resultArr = []
  }

  ngOnInit(): void {
    if (this.userData.email) {
      this.postService.getSavedPosts(this.userData.email, this.amt)
      this.postSub = this.postService.resultArrUpdatedListner().subscribe(data => {
        console.log(data)
        this.postsArr = data.postsArr
        this.render = true
        this.loading = false
        this.amt = data.amt ? data.amt : this.amt
        this.length = data.length ? data.length : this.length
        if (+this.amt >= +this.length) this.loadIndex = 2
      })
    } else {
      this.router.navigate(["/"])
    }
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe()
  }

  loadMore() {
    this.loading = true
    this.postService.getSavedPosts(this.userData.email, this.amt)
  }

}
