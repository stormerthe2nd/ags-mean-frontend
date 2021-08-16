import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./posts.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostService {
  postsArr: Post[] = [];
  private postArrUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ data: Post[] }>("http://localhost:3000").subscribe((postData) => {
      console.log(postData)
      this.postsArr = postData.data
      this.postArrUpdated.next([...this.postsArr])
    })
  }

  postArrUpdatedListener() {
    return this.postArrUpdated.asObservable()
  }

  addPost(post: Post) {
    console.log("imgUrl ", post.imgPath)
    const formData = new FormData()
    formData.append("fileInp", post.imgPath[0])
    formData.append("desInp", post.des)
    this.http.post<{ imgUrl: [] }>("http://localhost:3000/imgApi/upload", formData).subscribe(
      (postData) => {
        post.imgPath = postData.imgUrl
        this.postsArr.push(post)
        this.postArrUpdated.next([...this.postsArr])
      },
      (err) => { console.log(err) }
    )
  }
}