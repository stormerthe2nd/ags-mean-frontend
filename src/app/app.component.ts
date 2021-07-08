import { Component } from '@angular/core';
import { Post } from "./posts"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Posts Cloud';
  constructor() {
  }

  addPost(desInp: HTMLTextAreaElement, fileInp: HTMLInputElement) {
    console.log(desInp.value, fileInp.value)
  }

}
