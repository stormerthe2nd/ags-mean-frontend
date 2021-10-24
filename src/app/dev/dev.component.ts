import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

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
    })

  }

  ngOnInit(): void {
  }

}
