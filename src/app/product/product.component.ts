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
  url = window.location.href
  post = { imgPath: [] } as Post
  constructor(public postService: PostService) {
    $(document).ready(() => {
      $("#myimage").css("object-fit", "contain")
    })
  }

  ngOnInit(): void {
    this.postService.getPostById(window.location.href.split("/").splice(-1)[0]).then((data) => {
      data.post.id = data.post._id
      delete data.post._id
      this.post = data.post;
    })
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

  savePost(id: string) {
    console.log("saved was clicked")
    if (!this.postService.user.email) {
      return alert("This Functionality Requires Login")
    }
    this.postService.savePost(id, this.postService.user.email).then(data => {
      this.postService.savedPosts.push(id)
    })
  }

  unSavePost(id: string) {
    console.log("unsaved was clicked")
    this.postService.unSavePost(id, this.postService.user.email).then(data => {

      this.postService.savedPosts.splice(this.postService.savedPosts.indexOf(id), 1)
    })
  }

}
