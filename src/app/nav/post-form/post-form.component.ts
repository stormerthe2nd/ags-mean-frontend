import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/posts.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  postArr: Post[]
  @Input() post: Post;
  constructor(public postService: PostService, public route: ActivatedRoute) {
  }

  fileInp = []
  postCreationStatus = "uninit"
  categoryInp = undefined
  message = ''

  selected(event: any) {
    this.fileInp = event.target.files
  }

  selectChangeHandler(event: any) {
    this.categoryInp = event.target.value
    console.log(this.post)
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

  receivePost(event: any) {
    console.log(event)
  }
}
