import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  amt = 0
  loading = false
  usersArr = []
  renderPage = false
  userData = JSON.parse(localStorage.getItem("google_auth")) || {}

  constructor(public postService: PostService, private router: Router) {
    if (!this.userData.email) {
      router.navigate(["/"])
      return
    }
    postService.authorize(this.userData.email, true).then(data => {
      var role = data.user.role
      this.postService.role = role
      if (role !== "dev") {
        return this.router.navigate(["/"])
      }
      this.renderPage = true
      this.getUsers()
    })

  }

  getUsers() {
    this.postService.getUsers(this.amt).then(data => {
      this.usersArr = data.users
      console.log(data.users)
      this.amt += 30
    })
  }

  saveChanges(email: string, id: string) {
    this.loading = true
    this.postService.updateUserRole(email, (<HTMLInputElement>document.getElementById(id)).value).then(data => {
      this.usersArr.map(user => {
        user.email === data.email ? user.role = data.role : {}
        this.loading = false
      })
    })
  }

  ngOnInit(): void {
  }

}
