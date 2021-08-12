import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./posts.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostService {
  postsArr: Post[] = [];
  private postArrUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) { }

  updated(): string {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
  }

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