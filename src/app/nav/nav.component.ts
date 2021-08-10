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
  postCreationStatus = "uninit"
  addPost(form: NgForm): void {
    const { desInp, fileInp, linkInp } = form.value
    this.postCreationStatus = "uninit"
    if (desInp == "" || (fileInp == "" && linkInp == "")) {
      this.postCreationStatus = "empty input"
      document.getElementById("des").focus()
      return
    }
    let imgPaths: Array<string> = [linkInp]
    imgPaths.push(`${fileInp}`)
    this.postService.addPost({
      sno: 1,
      imgPath: imgPaths,
      des: desInp,
      updated: this.postService.updated(),
      active: true,
      category: ''
    })
    this.postCreationStatus = "success"

  }

}
