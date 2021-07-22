import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

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
      sno: this.postService.getPosts().length + 1,
      imgPath: imgPaths,
      des: desInp,
      updated: this.postService.updated(),
      active: true,
      category: ''
    })
    this.postCreationStatus = "success"
    console.log(this.postService.getPosts())
  }

}
