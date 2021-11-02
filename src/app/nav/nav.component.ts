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
  doc = document

  constructor(public postService: PostService, public router: Router) {
  }

  redirect(event: any) {
    if (!event) { }
    else if (event.keyCode === 13) { }
    else return
    console.log(event)
    if (this.searchBy === "Date") {
      var date = this.query.split("-")
      console.log(date)
      var index: any = Number(date[1] != "10" ? date[1].replace("0", "") : date[1]) - 1
      date[1] = this.months[index]
      index = date[2]
      date[2] = date[0]
      date[0] = index
      this.query = date.join("-")
    } else this.change()
    if (!this.query) return alert("Please Provide a Query")
    this.router.navigate(['/search', this.searchBy, this.query]);
  }

  change() {
    this.query = (<HTMLInputElement>document.getElementById('searchInp')).value
  }

  dateChange() {
    this.query = (<HTMLInputElement>document.getElementById('dateInp')).value
  }
}
