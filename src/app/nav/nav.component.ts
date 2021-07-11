import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../posts.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public postService: PostService) {
  }
  postCreationStatus = "uninit"
  addPost(form: NgForm): void {
    this.postCreationStatus = "uninit"
    if (form.value.desInp == "") {
      this.postCreationStatus = "empty input"
      document.getElementById("des").focus()
      return
    }
    let imgPaths: Array<string> = ["https://source.unsplash.com/500x500/?nature"]
    imgPaths.push(`${form.value.fileInp}`)
    this.postService.addPost({
      sno: this.postService.getPosts().length + 1,
      imgPath: imgPaths,
      des: form.value.desInp,
      updated: this.postService.updated(),
      active: true,
      category: ''
    })
    this.postCreationStatus = "success"
    console.log(this.postService.getPosts())
  }

}
