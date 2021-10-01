// TODO convert NgForm approach to ReactiveForms 
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
  fileInp: any = []
  postCreationStatus = "uninit"
  categoryInp = undefined
  freeShipInp = undefined
  message = ''

  constructor(public postService: PostService, public route: ActivatedRoute) {

  }
  ngOnInit() {
    this.postService.selectedPostToEdit;
    (<HTMLInputElement>(document.getElementById("freeShip"))).value = `${this.postService.selectedPostToEdit?.freeShip}`;
    (<HTMLInputElement>(document.getElementById("category"))).value = `${this.postService.selectedPostToEdit?.category}`;
  }

  selected(event: any) {
    this.fileInp = event.target.files
  }

  setStatus(status, msg, id) {
    Array.from(document.getElementsByClassName("form-select")).forEach((el: any) => { el.style.boxShadow = '0px 0px' })
    Array.from(document.getElementsByClassName("form-control")).forEach((el: any) => { el.style.boxShadow = '0px 0px' })
    if (id !== "") {
      document.getElementById(id).style.boxShadow = "0px 2px rgb(253, 140, 140)"
      document.getElementById(id).focus()
    }
    this.postCreationStatus = status
    this.message = msg
  }

  validForm(fileInp, desInp, titleInp, priceInp, freeShipInp, categoryInp): boolean {
    let allowedMimeTypes = ["jpg", "jpeg", "gif", "png", "webp"]
    for (var i = 0; i < fileInp.length; i++) {
      let fileType = fileInp[i].name.split(".").slice(-1)[0]
      if (!allowedMimeTypes.includes(fileInp[i].name.split(".").slice(-1)[0])) {
        this.setStatus("invalid", `.${fileType} file is not Supported as an Image File`, "inputGroupFile02")
        return false
      }
    }
    // fileInp.forEach(file => {
    //   console.log(file.name)

    // });
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
    if (!this.validForm(this.fileInp, desInp, titleInp, priceInp, this.freeShipInp, this.categoryInp)) return
    this.postCreationStatus = "load"
    this.postService.addPost({
      imgPath: [...this.fileInp],
      link: [linkInp != "" ? linkInp : ""],
      des: desInp,
      title: titleInp,
      price: priceInp,
      freeShip: this.freeShipInp == undefined ? false : this.freeShipInp,
      category: this.categoryInp == undefined ? "Uncategorised" : this.categoryInp
    }).subscribe(
      (postData) => {
        postData.post.id = postData.post._id
        delete postData.post._id
        console.log(postData.post)
        this.postService.postsArr.push(postData.post)
        this.postService.postArrUpdated.next([...this.postService.postsArr])
        this.postCreationStatus = "success"
      })
    form.reset()
  }

  editPost(form: NgForm) {
    this.categoryInp = (<HTMLInputElement>document.getElementById("category")).value
    this.freeShipInp = (<HTMLInputElement>document.getElementById("freeShip")).value
    const { desInp, linkInp, titleInp, priceInp } = form.value
    if (!this.validForm(this.fileInp, desInp, titleInp, priceInp, this.freeShipInp, this.categoryInp)) return
    this.postCreationStatus = "load"
    console.log(this.postService.selectedPostToEdit.id)
    this.postService.editPost({
      id: this.postService.selectedPostToEdit.id,
      imgToAdd: [...this.fileInp],
      links: [...this.postService.selectedPostToEdit.imgPath, linkInp != "" ? linkInp : ""],
      imgToDel: this.deletedLinks,
      des: desInp,
      title: titleInp,
      price: priceInp,
      freeShip: !this.freeShipInp ? false : this.freeShipInp,
      category: !this.categoryInp ? "Uncategorised" : this.categoryInp
    }).subscribe((data: any) => {
      console.log(data)
      this.deletedLinks = []
      form.controls["fileInp"].reset();
      data.id = data._id
      this.postService.selectedPostToEdit = data
      this.postCreationStatus = "success"
      this.ngOnInit()
      this.postService.getPosts()
    });
  }

  deleteImage(link: string) {
    if (confirm("Are you sure you want to Delete this Image")) {
      this.deletedLinks.push(link)
      this.postService.selectedPostToEdit.imgPath = this.postService.selectedPostToEdit.imgPath.filter((el) => { return el != link })
    }
  }
}
