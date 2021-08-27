import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../posts.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  postArr: Post[]
  constructor(public postService: PostService) {
  }
  doc = document
  defaultBg = "rgb(212, 212, 212)"
  darkBg = "rgb(66, 66, 66)"

  changeMode() {
    if (document.body.style.backgroundColor == this.defaultBg) document.body.style.backgroundColor = this.darkBg
    else document.body.style.backgroundColor = this.defaultBg
  }
}
