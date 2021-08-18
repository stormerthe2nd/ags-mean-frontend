import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators"
import { Post } from "./posts.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostService {
  postsArr: Post[] = [];
  private postArrUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ data: any }>("http://localhost:3000")
      .pipe(map((postData) => {
        return postData.data.map(post => {
          post.id = post._id
          delete post._id
          return post
        })
      }))
      .subscribe((mappedPost) => {
        console.log(mappedPost)
        this.postsArr = mappedPost
        this.postArrUpdated.next([...this.postsArr])
      })
  }

  postArrUpdatedListener() {
    return this.postArrUpdated.asObservable()
  }

  addPost(post: any) {
    console.log("imgUrl ", post.imgPath)
    const formData = new FormData()
    post.imgPath.forEach(element => {
      formData.append("fileInp", element)
    });
    formData.append("desInp", post.des)
    this.http.post<{ imgUrl: [] }>("http://localhost:3000/postApi/upload", formData).subscribe(
      (postData) => {
        post.imgPath = postData.imgUrl
        this.postsArr.push(post)
        this.postArrUpdated.next([...this.postsArr])
      },
      (err) => { console.log(err) }
    )
  }

  deletePost(id: string) {
    this.http.delete("http://localhost:3000/postApi/delete/" + id).subscribe((data) => {
      console.log(data)
    })
  }
}