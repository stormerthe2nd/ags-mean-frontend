import { Component } from '@angular/core';
import { Post } from "./posts"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Posts Cloud';
  updated(): string {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
  }
  postsArr: Array<Post> = [{
    sno: 1,
    imgPath: [""],
    des: "",
    updated: this.updated(),
    active: true
  }]
  constructor() {
  }

  addPost() {

  }

}
