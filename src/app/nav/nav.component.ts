import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../posts.model';
import * as $ from 'jquery';

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
  hidden = false

  hideTitle() {
    if (!this.hidden) {
      $('.main-title').hide(300);
      $('.btn-lg').hide(300);
      this.hidden = true
      return
    }
    $('.main-title').show(700);
    $('.btn-lg').show(700);
    this.hidden = false
  }
}
