import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmptyError } from 'rxjs';
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
  categoryInp = undefined
  message = ''

  selected(event: any) {
    this.fileInp = event.target.files
  }

  selectChangeHandler(event: any) {
    this.categoryInp = event.target.value
  }

  addPost(form: NgForm): void {
    const { desInp, linkInp, titleInp, priceInp } = form.value
    this.postCreationStatus = "uninit"
    if (desInp == "" || titleInp == "") {
      this.postCreationStatus = "invalid"
      this.message = "please fill all the necessary inputs"
      return
    }
    if (priceInp == null) {
      this.postCreationStatus = "invalid"
      this.message = "please enter a valid price"
      return
    }
    this.postService.addPost({
      imgPath: [...this.fileInp],
      link: [linkInp != "" ? linkInp : ""],
      des: desInp,
      title: titleInp,
      price: priceInp,
      category: this.categoryInp == undefined ? this.categoryInp = "Uncategorised" : this.categoryInp
    })
    this.postCreationStatus = "success"
  }

  changeMode() {
    if (document.body.style.backgroundColor == this.defaultBg) document.body.style.backgroundColor = this.darkBg
    else document.body.style.backgroundColor = this.defaultBg
  }
}
