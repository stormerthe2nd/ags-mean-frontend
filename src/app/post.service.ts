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
    console.log(post)
    const formData = new FormData()
    post.imgPath.forEach(element => {
      formData.append("fileInp", element)
    });
    formData.append("desInp", post.des)
    formData.append("titleInp", post.title)
    formData.append("priceInp", post.price)
    formData.append("linkInp", post.link)
    formData.append("categoryInp", post.category)
    this.http.post<{ post: any }>("http://localhost:3000/postApi/upload", formData).subscribe(
      (postData) => {
        postData.post.id = postData.post._id
        delete postData.post._id
        post = postData.post
        console.log(post)
        this.postsArr.push(post)
        this.postArrUpdated.next([...this.postsArr])
      },
      (err) => { console.log(err) }
    )
  }

  deletePost(id: string) {
    console.log(id)
    this.http.delete<{ deleted: boolean }>("http://localhost:3000/postApi/delete/" + id).subscribe((data) => {
      if (data.deleted) {
        this.postsArr = this.postsArr.filter(item => item.id !== id)
        this.postArrUpdated.next([...this.postsArr])
      }
    })
  }
}