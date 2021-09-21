import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  query = window.location.href.split("/").splice(-1)[0]
  postsArr = [] as Post[]

  constructor(private PostService: PostService) {
    PostService.searchPost(this.query).then((data) => {
      this.postsArr = data.searchResults
      console.log(data)
    })
  }

  ngOnInit(): void {
  }

}
