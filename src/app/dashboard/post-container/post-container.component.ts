import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/posts';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {
  @Input() postsArr: Post[];
  constructor() { }

  ngOnInit(): void {
  }

  postClickEvent(post) {
    console.log(post)
  }

}
