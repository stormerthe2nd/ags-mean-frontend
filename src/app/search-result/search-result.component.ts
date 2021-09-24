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
  query = window.location.href.split("/").splice(-1)[0]
  postsArr = [] as Post[]

  constructor(private PostService: PostService, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(paramMap => {
      this.query = paramMap.get("query")
      PostService.searchPost(this.query).then((data) => {
        this.postsArr = data.searchResults
        console.log(data)
      })
    });
  }

  ngOnInit(): void {
  }

}
