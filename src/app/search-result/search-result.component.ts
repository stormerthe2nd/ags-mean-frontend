import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchBy: string
  query = window.location.href.split("/").splice(-1)[0]
  index = 4
  postsArr = [] as Post[]

  constructor(private PostService: PostService, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(paramMap => {
      this.query = paramMap.get("query");
      this.searchBy = paramMap.get("searchBy");
      PostService.searchPost(this.searchBy, this.query, this.index).then((data) => {
        data.searchResults.forEach(post => { post.id = post._id; delete post._id });
        this.postsArr = data.searchResults;
      });
    });
  }

  ngOnInit(): void {
  }
}
