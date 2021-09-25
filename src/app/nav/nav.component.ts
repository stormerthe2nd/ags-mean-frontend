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
  searchQuerys = ["Title", "Description", "Category", "Price", "Availability", "Date Updated"]
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

  reset() {
    if (!this.query) return
    this.router.navigate(['/search', this.searchBy, this.query]);
  }

  change() {
    this.query = (<HTMLInputElement>document.getElementById('searchInp')).value
  }
}
