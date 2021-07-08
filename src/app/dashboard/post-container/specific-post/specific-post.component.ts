import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/posts';

@Component({
  selector: 'app-specific-post',
  templateUrl: './specific-post.component.html',
  styleUrls: ['./specific-post.component.css']
})
export class SpecificPostComponent implements OnInit {
  @Input() post: Post;
  constructor() { }

  ngOnInit(): void {
  }

}
