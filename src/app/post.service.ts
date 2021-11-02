import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators"
import { Post } from "./posts.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class PostService {
  domain = environment.domain
  postsArr: Post[] = [];
  resultArr: Post[] = []
  savedPosts = []
  selectedPostToEdit: Post = null
  public user: any = JSON.parse(localStorage.getItem("google_auth")) || {}
  public role = "client"
  public loadIndex = 0
  public postArrUpdated = new Subject<Post[]>()
  public resultArrUpdated = new Subject<any>()

  constructor(private http: HttpClient, public router: Router) {

  }

  getPosts() {
    this.http.get<{ data: any }>(`http://${this.domain}:3000?cat=${this.categories()[this.loadIndex]}`)
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

  postArrUpdatedListener() { return this.postArrUpdated.asObservable() }
  resultArrUpdatedListner() { return this.resultArrUpdated.asObservable() }

  addPost(post: any) {
    const formData = new FormData()
    post.imgPath.forEach(element => { formData.append("fileInp", element) })
    formData.append("desInp", post.des)
    formData.append("titleInp", post.title)
    formData.append("priceInp", post.price)
    formData.append("freeShipInp", post.freeShip)
    formData.append("linkInp", post.link)
    formData.append("categoryInp", post.category === '' ? "Uncategorised" : post.category)
    return this.http.post<{ post: any }>(`http://${this.domain}:3000/postApi/upload` + `?email=${this.user.email}`, formData)
  }

  deletePost(id: string) {
    this.http.delete<{ deleted: boolean }>(`http://${this.domain}:3000/postApi/delete/` + id + `?email=${this.user.email}`).subscribe((data) => {
      if (data.deleted) {
        this.postsArr = this.postsArr.filter(item => item.id !== id)
        this.postArrUpdated.next([...this.postsArr])
        if (this.router.url.split("/")[1] === "search") {
          this.resultArr = this.resultArr.filter(item => item.id !== id)
          this.resultArrUpdated.next({ searchResults: [...this.resultArr] })
        } else if (this.router.url.split("/")[2] === "saved") {
          this.resultArr = this.resultArr.filter(item => item.id !== id)
          this.resultArrUpdated.next({ postsArr: [...this.resultArr] })
        }
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
    return this.http.put<{ data: any }>(`http://${this.domain}:3000/postApi/update/` + post.id + `?email=${this.user.email}`, editFormData)
  }

  categories() {
    return ["Watches", "Bags", "Glares", "Headsets", "Earbuds", "Cosmetics", "Mens Wear", "Mobile Accessories", "Ladies Wear", "Household", "Foot Wear", "Kids", "Bedsheets", "Uncategorised"]
  }

  getPostById(id) {
    return this.http.get<any>(`http://${this.domain}:3000/product/${id}`).toPromise()
  }

  searchPost(searchBy: string, query: string, index: number) {
    if (index === 0) this.resultArr = []
    this.http.get<any>(`http://${this.domain}:3000/search/${searchBy}/${query}?index=${index}`).subscribe((data: any) => {
      data.searchResults.forEach(post => { post.id = post._id; delete post._id });
      console.log(data)
      this.resultArr.push(...data.searchResults)
      this.resultArrUpdated.next({ searchResults: [...this.resultArr], index: data.index, finished: data.finished })
    })
  }

  authorize(email: string, returnData = false) {
    if (returnData) {
      return this.http.get<any>(`http://${this.domain}:3000/auth?email=${email.split("@")[0]}`).toPromise()
    }
    this.http.get<any>(`http://${this.domain}:3000/auth?email=${email.split("@")[0]}`).subscribe(data => {
      this.role = data.user.role
      this.savedPosts = data.user.savedPosts
    })
  }

  getUsers() {
    return this.http.get<{ users: any }>(`http://${this.domain}:3000/auth/users/all`).toPromise()
  }

  updateUserRole(email: string, role: string) {
    return this.http.get<any>(`http://${this.domain}:3000/auth/update?role=${role}&email=${email}`).toPromise()
  }

  savePost(id: string, email: string) {
    return this.http.post<any>(`http://${this.domain}:3000/auth/savePost`, { id: id, email: email }).toPromise()
  }

  unSavePost(id: string, email: string) {
    return this.http.post<any>(`http://${this.domain}:3000/auth/unSavePost`, { id: id, email: email }).toPromise()
  }

  getSavedPosts(email, amt) {
    return this.http.get<any>(`http://${this.domain}:3000/auth/getSavedPosts?email=${email}&amt=${amt}`).subscribe(data => {
      data.postsArr.forEach(post => { post.id = post._id; delete post._id });
      this.resultArr.push(...data.postsArr)
      this.resultArrUpdated.next({ postsArr: [...this.resultArr], amt: data.amt, length: data.length })
    })
  }
}
