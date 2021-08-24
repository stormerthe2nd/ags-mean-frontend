import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../posts.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  postArr: Post[]
  constructor(public postService: PostService) {
  }
  fileInp = []
  postCreationStatus = "uninit"
  doc = document
  defaultBg = "rgb(212, 212, 212)"
  darkBg = "rgb(66, 66, 66)"

  selected(event: any) {
    this.fileInp = event.target.files
    console.log(this.fileInp)
  }

  addPost(form: NgForm): void {
    const { desInp, linkInp, titleInp, priceInp } = form.value
    this.postCreationStatus = "uninit"
    if (desInp == "" || (this.fileInp.length < 1 && linkInp == "")) {
      this.postCreationStatus = "empty input"
      document.getElementById("des").focus()
      return
    }

    this.postService.addPost({
      imgPath: [...this.fileInp],
      des: desInp,
      title: titleInp,
      price: priceInp
    })
    this.postCreationStatus = "success"

  }

  changeMode() {
    if (document.body.style.backgroundColor == this.defaultBg) document.body.style.backgroundColor = this.darkBg
    else document.body.style.backgroundColor = this.defaultBg
  }
}
