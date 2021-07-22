import { Injectable } from "@angular/core";
import { Post } from "./posts.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostService {
  private postsArr: Post[] = [];

  updated(): string {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
  }

  getPosts() {
    return this.postsArr
  }

  addPost(post: Post) {
    this.postsArr.push(post)
  }
}