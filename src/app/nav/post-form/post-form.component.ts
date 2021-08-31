import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/posts.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postArr: Post[]
  post: Post;
  deletedLinks: string[] = []
  entered = false
  fileInp = []
  postCreationStatus = "uninit"
  categoryInp = undefined
  message = ''

  constructor(public postService: PostService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.postService.selectedPostToEdit
  }

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
    this.message = "Post will be created shortly"
    form.reset()
  }

  editPost(form: NgForm) {
    console.log(form.value)
  }

  deleteImage(link: string) {
    this.deletedLinks.push(link)
    this.postService.selectedPostToEdit.imgPath = this.postService.selectedPostToEdit.imgPath.filter((el) => { return el != link })
  }

  undoImage() {
    this.postService.selectedPostToEdit.imgPath = this.postService.selectedPostToEdit.imgPath.concat(this.deletedLinks)
    this.deletedLinks.length = 0
  }

}
