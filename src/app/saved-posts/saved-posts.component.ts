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
  userData = JSON.parse(localStorage.getItem("google_auth")) || {}
  render = false
  loadIndex = 0
  amt = 0
  loading = true
  constructor(public postService: PostService, router: Router) {
    if (this.userData.email) {
      console.log("user")
      postService.getSavedPosts(this.userData.email, this.amt).then(data => {
        data.postsArr.forEach(post => {
          post.id = post._id
          delete post._id
        });
        console.log(data)
        this.postsArr = data.postsArr
        this.render = true
        this.loading = false
        this.amt = data.amt
        if (+data.amt >= +data.length) this.loadIndex = 2
      })
    }
  }

  loadMore() {
    this.loading = true
    this.postService.getSavedPosts(this.userData.email, this.amt).then(data => {
      data.postsArr.forEach(post => {
        post.id = post._id
        delete post._id
      });
      console.log(data)
      this.postsArr = this.postsArr.concat(data.postsArr)
      this.render = true
      this.loading = false
      this.amt = data.amt
      if (+data.amt >= +data.length) this.loadIndex = 2
    })
  }

  ngOnInit(): void {
  }

}
