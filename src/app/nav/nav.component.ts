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
  date = "00-00-0000"
  searchQuerys = ["Description", "Title", "Category", "Date"]
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
    if (this.searchBy === "Date") {
      this.query = (<HTMLInputElement>document.getElementById('dateInp')).value
      var date = this.query.split("-")
      var index: any = Number(date[1] != "10" ? date[1].replace("0", "") : date[1]) - 1
      date[1] = this.months[index]
      index = date[2]
      date[2] = date[0]
      date[0] = index
      this.query = date.join("-")
    }
    if (!this.query) return alert("Please Provide a Query")
    this.router.navigate(['/search', this.searchBy, this.query]);
  }

  change() {
    this.query = (<HTMLInputElement>document.getElementById('searchInp')).value
  }
}
