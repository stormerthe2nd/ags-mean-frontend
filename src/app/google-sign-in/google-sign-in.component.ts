import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { PostService } from '../post.service';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.css']
})
export class GoogleSignInComponent implements OnInit {
  public user: SocialUser = new SocialUser;
  userData = JSON.parse(localStorage.getItem("google_auth")) || {}
  constructor(private authService: SocialAuthService, public postService: PostService) {
    this.postService.user = this.userData
    console.log(this.userData?.name)
  }

  ngOnInit(): void {
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      localStorage.setItem("google_auth", JSON.stringify(data))
      this.userData = data
      this.postService.user = data
      console.log(data)
    });
  }

  signOut() {
    this.authService.signOut()
    localStorage.removeItem("google_auth")
    this.userData = {}
    this.postService.user = {}
  }
}
