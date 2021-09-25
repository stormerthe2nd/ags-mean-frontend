import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts.model';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { merge } from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  date = "00-00-0000"
  searchQuerys = ["Title", "Description", "Category", "Date"]
  searchBy: string = this.searchQuerys[0]
  postArr: Post[]
  query: string

  constructor(public postService: PostService, public router: Router, private activeRoute: ActivatedRoute) {
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

  redirect() {
    if (this.searchBy === "Date") this.query = [$("#dd").val(), $("#mm").val(), $("#yyyy").val(),].join("-")
    if (!this.query) return
    this.router.navigate(['/search', this.searchBy, this.query]);
  }

  change() {
    this.query = (<HTMLInputElement>document.getElementById('searchInp')).value
  }
}
