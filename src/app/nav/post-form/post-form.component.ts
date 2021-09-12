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
  freeShipInp = undefined
  message = ''

  constructor(public postService: PostService, public route: ActivatedRoute) {
  }
  ngOnInit() {
    this.postService.selectedPostToEdit
  }

  selected(event: any) {
    this.fileInp = event.target.files
  }

  setStatus(status, msg, id) {
    Array.from(document.getElementsByClassName("form-select")).forEach((el: any) => {
      el.style.boxShadow = '0px 0px'
    })
    Array.from(document.getElementsByClassName("form-control")).forEach((el: any) => {
      el.style.boxShadow = '0px 0px'
    })
    if (id !== "") {
      document.getElementById(id).style.boxShadow = "0px 2px rgb(253, 140, 140)"
      document.getElementById(id).focus()
    }
    this.postCreationStatus = status
    this.message = msg
  }

  validForm(desInp, titleInp, priceInp, freeShipInp, categoryInp): boolean {
    if (titleInp == '' || !titleInp) {
      this.setStatus("invalid", "please provide a Title", "title")
      return false
    }
    else if (!priceInp) {
      this.setStatus("invalid", "please provide a valid Price", "price")
      return false
    }
    else if (freeShipInp == '' || !freeShipInp) {
      this.setStatus("invalid", "please provide Shipping Details", "freeShip")
      return false
    }
    else if (desInp == '' || !desInp) {
      this.setStatus("invalid", "please provide a Description", "des")
      return false
    }
    else if (categoryInp == '' || !categoryInp) {
      this.setStatus("invalid", "please provide a Category", "category")
      return false
    } else {
      this.setStatus("success", "Post will be Saved Shortly", "")
      return true
    }
  }

  addPost(form: NgForm) {
    this.categoryInp = (<HTMLInputElement>document.getElementById("category")).value
    this.freeShipInp = (<HTMLInputElement>document.getElementById("freeShip")).value

    const { desInp, linkInp, titleInp, priceInp } = form.value
    this.postCreationStatus = "uninit"
    if (!this.validForm(desInp, titleInp, priceInp, this.freeShipInp, this.categoryInp)) return
    this.postService.addPost({
      imgPath: [...this.fileInp],
      link: [linkInp != "" ? linkInp : ""],
      des: desInp,
      title: titleInp,
      price: priceInp,
      freeShip: this.freeShipInp == undefined ? false : this.freeShipInp,
      category: this.categoryInp == undefined ? "Uncategorised" : this.categoryInp
    })
    form.reset()
  }

  editPost(form: NgForm) {
    this.categoryInp = (<HTMLInputElement>document.getElementById("category")).value
    this.freeShipInp = (<HTMLInputElement>document.getElementById("freeShip")).value
    const { desInp, linkInp, titleInp, priceInp } = form.value
    if (!this.validForm(desInp, titleInp, priceInp, this.freeShipInp, this.categoryInp)) return
    this.postService.editPost({
      id: this.postService.selectedPostToEdit.id,
      imgToAdd: [...this.fileInp],
      links: [...this.postService.selectedPostToEdit.imgPath, linkInp != "" ? linkInp : ""],
      imgToDel: this.deletedLinks,
      des: desInp,
      title: titleInp,
      price: priceInp,
      freeShip: this.freeShipInp == undefined ? false : this.freeShipInp,
      category: this.categoryInp == undefined ? "Uncategorised" : this.categoryInp
    })
    this.deletedLinks = []
    form.controls["fileInp"].reset()
    form.controls["categoryInp"].reset()
    form.controls["freeShipInp"].reset()
    this.ngOnInit()
  }

  deleteImage(link: string) {
    if (confirm("Are you sure you want to Delete this Image")) {
      this.deletedLinks.push(link)
      this.postService.selectedPostToEdit.imgPath = this.postService.selectedPostToEdit.imgPath.filter((el) => { return el != link })
    }
  }
}
