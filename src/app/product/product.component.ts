import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts.model';
import * as $ from "jquery"

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  index = 0
  post = { imgPath: [] } as Post
  constructor(private PostService: PostService) { }

  ngOnInit(): void {
    this.PostService.getPostById(window.location.href.split("/").splice(-1)[0]).then((data) => { this.post = data.post })
  }

  pushToFrame(img) {
    this.index = this.post.imgPath.indexOf(img)
  }

}
