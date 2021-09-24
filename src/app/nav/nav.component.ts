import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts.model';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  searchBy: string = "Title"
  location = String(window.location).replaceAll("/", "")
  origin = window.location.origin.replaceAll("/", "")
  postArr: Post[]
  query: string

  constructor(public postService: PostService, public router: Router, private activeRoute: ActivatedRoute) {
    $(document).ready(() => {
      $("#dropdownMenu3").click(() => {
        $("#drop").css("display") === "none" ? $("#drop").show() : $("#drop").hide()
      })
    })
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

  reset() {
    if (!this.query) return
    this.router.navigate(['/search', this.searchBy, this.query]);
  }

  change() {
    this.query = (<HTMLInputElement>document.getElementById('searchInp')).value
  }
}
