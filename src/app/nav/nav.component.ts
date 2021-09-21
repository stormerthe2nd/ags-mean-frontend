import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts.model';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  location = String(window.location).replaceAll("/", "")
  origin = window.location.origin.replaceAll("/", "")
  postArr: Post[]
  query = ""
  constructor(public postService: PostService, public router: Router) {
  }
  doc = document
  hidden = false
  opened = false
  closed = false

  hideTitle(opened: boolean, closed: boolean) {
    if (!this.hidden) {
      $('.main-title').hide(200);
      $('.btn-lg').hide(200);
      this.hidden = true
    } else {
      $('.main-title').show(300);
      $('.btn-lg').show(300);
      this.hidden = false
    }
  }

  change() {
    this.query = (<HTMLInputElement>document.getElementById('searchInp')).value
  }

  submitQuery(query) {
    if (query === "") return
    if (String(window.location).includes("search")) {
    } else {
      this.router.navigate([`/search/${query}`])
    }
  }
}
