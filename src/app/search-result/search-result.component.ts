import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searchBy: string = ""
  postSub: Subscription
  routeSub: Subscription
  query = window.location.href.split("/").splice(-1)[0]
  index = 0
  postsArr = [] as Post[]
  loading = true
  loadIndex = 0
  store = { searchBy: this.searchBy, query: this.query }

  constructor(private PostService: PostService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSub = this.activeRoute.paramMap.subscribe(paramMap => {
      this.query = paramMap.get("query");
      this.searchBy = paramMap.get("searchBy");
      this.index = 0
      this.PostService.searchPost(this.searchBy, this.query, this.index)
      this.postSub = this.PostService.resultArrUpdatedListner().subscribe((data) => {
        this.loading = false
        this.postsArr = data.searchResults;
        this.loadIndex = data.finished
      });
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe()
    this.routeSub.unsubscribe()
  }

  loadMore() {
    this.loading = true
    this.index += 12
    this.PostService.searchPost(this.searchBy, this.query, this.index)
  }
}
