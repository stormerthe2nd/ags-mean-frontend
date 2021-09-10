import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/posts.model';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit, OnDestroy {
  postsArr: Post[];
  categories = this.PostService.categories()
  filteredPost: any
  private postSub: Subscription
  constructor(public PostService: PostService) {

  }

  ngOnInit(): void {
    this.PostService.getPosts()
    this.postSub = this.PostService.postArrUpdatedListener().subscribe((postsArr: Post[]) => {
      this.postsArr = postsArr
      this.filteredPost = this.filterCategory(this.categories, this.postsArr)
      console.log('filteredPost', this.filteredPost)
    })
  }
  ngOnDestroy(): void {
    this.postSub.unsubscribe()
  }

  filterCategory(categories, arr) {
    console.log(categories, arr)
    var arr2 = []
    categories.forEach(cat => {
      var arr3 = []
      arr.forEach(element => {
        if (element.category === cat) arr3.push(element)
      });
      arr2.push(arr3)
    })
    return arr2
  }

}
