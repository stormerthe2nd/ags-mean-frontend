import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searchBy: string = ""
  query = window.location.href.split("/").splice(-1)[0]
  index = 0
  postsArr = [] as Post[]
  loading = true
  loadIndex = 0
  store = { searchBy: this.searchBy, query: this.query }

  constructor(private PostService: PostService, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(paramMap => {
      this.query = paramMap.get("query");
      this.searchBy = paramMap.get("searchBy");
      this.index = 0
      PostService.searchPost(this.searchBy, this.query, this.index).then((data) => {
        data.searchResults.forEach(post => { post.id = post._id; delete post._id });
        this.loading = false
        this.postsArr = data.searchResults;
        this.loadIndex = data.finished
      });
    });
  }
  ngOnDestroy(): void {
  }

  loadMore() {
    this.loading = true
    this.index += 4
    this.PostService.searchPost(this.searchBy, this.query, this.index).then((data) => {
      data.searchResults.forEach(post => { post.id = post._id; delete post._id });
      this.loading = false
      this.postsArr.push(...data.searchResults)
      this.loadIndex = data.finished
      console.log(this.postsArr, data.index, data.finished)
    })
  }

  ngOnInit(): void {
  }
}
