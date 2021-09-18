import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  postsArr: Post[]

  constructor(private PostService: PostService) {
    PostService.searchPost(window.location.href.split("/").splice(-1)[0]).then((data) => { console.log(data) })
  }

  ngOnInit(): void {
  }

}
