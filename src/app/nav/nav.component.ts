import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../posts';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() postsArr: Post[];
  @Input() today: string;
  constructor() {
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
    this.postsArr.push({
      sno: this.postsArr.length + 1,
      imgPath: imgPaths,
      des: form.value.desInp,
      updated: this.today,
      active: true,
      category: ''
    })
    this.postCreationStatus = "success"
    console.log(this.postsArr)
  }

}
