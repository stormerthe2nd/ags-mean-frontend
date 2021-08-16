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

  selected(event: any) {
    this.fileInp = event.target.files
    console.log(this.fileInp)
  }

  addPost(form: NgForm): void {
    const { desInp, linkInp } = form.value
    this.postCreationStatus = "uninit"
    if (desInp == "" || (this.fileInp.length < 1 && linkInp == "")) {
      this.postCreationStatus = "empty input"
      document.getElementById("des").focus()
      return
    }
    // linkInp != "" || linkInp != undefined ? this.fileInp.push(linkInp) : {}
    this.postService.addPost({
      sno: 1,
      imgPath: [this.fileInp[0]],
      des: desInp,
      updated: "",
      active: true,
      category: ''
    })
    this.postCreationStatus = "success"

  }

}
