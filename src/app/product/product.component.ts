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

  copyToClipboard() {
    var copy = (<HTMLInputElement>document.getElementById("copy"))
    copy.classList.remove("fa-copy")
    copy.classList.add("fa-check")
    var item = (<HTMLInputElement>document.getElementById("description")).innerHTML;
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    setTimeout(() => {
      copy.classList.remove("fa-check")
      copy.classList.add("fa-copy")
    }, 5000)
  }

  back() {
    history.back()
  }
}
