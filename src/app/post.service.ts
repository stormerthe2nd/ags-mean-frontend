import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators"
import { Post } from "./posts.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostService {
  postsArr: Post[] = [];
  selectedPostToEdit: Post = null
  public user: any = {}
  public role = "client"
  public loadIndex = 0
  public pageLoaded = false
  public postArrUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) { }

  getPosts() {
    console.log(this.loadIndex)
    this.http.get<{ data: any }>(`http://localhost:3000?cat=${this.categories()[this.loadIndex]}`)
      .pipe(map((postData) => {
        return postData.data.map(post => {
          post.id = post._id
          delete post._id
          return post
        })
      })).subscribe(mappedPost => {
        if (mappedPost.length < 1 && this.loadIndex < this.categories().length) {
          this.loadIndex++
          return this.getPosts()
        }
        this.loadIndex++
        console.log(mappedPost)
        this.postsArr.push(...mappedPost)
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
    formData.append("freeShipInp", post.freeShip)
    formData.append("linkInp", post.link)
    formData.append("categoryInp", post.category === '' ? "Uncategorised" : post.category)
    console.log(formData)
    return this.http.post<{ post: any }>("http://localhost:3000/postApi/upload", formData)
  }

  deletePost(id: string) {
    this.http.delete<{ deleted: boolean }>("http://localhost:3000/postApi/delete/" + id).subscribe((data) => {
      if (data.deleted) {
        this.postsArr = this.postsArr.filter(item => item.id !== id)
        this.postArrUpdated.next([...this.postsArr])
      }
    })
  }

  selectedToEdit(post: Post) {
    this.selectedPostToEdit = post
  }

  emptyUploadForm() {
    this.selectedPostToEdit = null
  }

  editPost(post: any) {
    const editFormData = new FormData()
    post.imgToAdd.forEach(element => {
      editFormData.append("imgToAdd", element)
    });
    post.links.forEach(element => {
      editFormData.append("links", element)
    });
    post.imgToDel.forEach(element => {
      editFormData.append("imgToDel", element)
    });
    editFormData.append("desInp", post.des)
    editFormData.append("titleInp", post.title)
    editFormData.append("priceInp", post.price)
    editFormData.append("freeShipInp", post.freeShip)
    editFormData.append("categoryInp", post.category)
    return this.http.put<{ data: any }>("http://localhost:3000/postApi/update/" + post.id, editFormData)
  }

  categories() {
    return ["Watches", "Bags", "Glares", "Headsets", "Earbuds", "Cosmetics", "Mens Wear", "Mobile Accessories", "Ladies Wear", "Household", "Foot Wear", "Kids", "Bedsheets", "Uncategorised"]
  }

  getPostById(id) {
    return this.http.get<any>(`http://localhost:3000/product/${id}`).toPromise()
  }

  searchPost(searchBy: string, query: string, index: number) {
    return this.http.get<any>(`http://localhost:3000/search/${searchBy}/${query}?index=${index}`).toPromise()
  }

  authorize(email: string, returnData = false) {
    if (returnData) {
      return this.http.get<any>(`http://localhost:3000/auth?email=${email.split("@")[0]}`).toPromise()
    }
    this.http.get<any>(`http://localhost:3000/auth?email=${email.split("@")[0]}`).subscribe(data => {
      this.role = data.user.role
    })
  }

  getUsers(amt: number) {
    return this.http.get<{ users: any }>(`http://localhost:3000/auth/users/${amt}`).toPromise()
  }

  updateUserRole(email: string, role: string) {
    return this.http.get<any>(`http://localhost:3000/auth/update?role=${role}&email=${email}`).toPromise()
  }
}
