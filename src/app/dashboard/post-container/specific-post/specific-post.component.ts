import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/posts.model';
import * as $ from "jquery"


@Component({
  selector: 'app-specific-post',
  templateUrl: './specific-post.component.html',
  styleUrls: ['./specific-post.component.css']
})
export class SpecificPostComponent implements OnInit {
  @Input() post = {} as Post;
  showSave: boolean = true
  constructor(public postService: PostService, private router: Router) {
    $(document).ready(function () {
      var display = function () {
        if ($(window).width() < 618) {
          $(".un-imp").css("display", "none")
        } else if ($(window).width() >= 618) {
          $(".un-imp").css("display", "block")
        }
      }
      display()
      $(window).on("resize", display)
    })
  }

  ngOnInit(): void {
  }

  deleteThisPost(id: string) {
    confirm("Are you sure you want to Delete this Post") ? this.postService.deletePost(id) : {}
  }

  selectedPost(post: Post) {
    this.postService.selectedToEdit(post)
  }

  redirect(id) {
    console.log(this.post)
    this.router.navigate(["/product", id])
  }

  savePost(id: string) {
    if (!this.postService.user.email) {
      return alert("This Functionality Requires Login")
    }
    this.postService.savePost(id, this.postService.user.email).then(data => {
      this.postService.savedPosts.push(id)
    })
  }

  unSavePost(id: string) {
    this.postService.unSavePost(id, this.postService.user.email).then(data => {

      this.postService.savedPosts.splice(this.postService.savedPosts.indexOf(id), 1)
    })
  }

}
