import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/posts.model';

@Component({
  selector: 'app-specific-post',
  templateUrl: './specific-post.component.html',
  styleUrls: ['./specific-post.component.css']
})
export class SpecificPostComponent implements OnInit {
  @Input() post: Post;
  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

  deleteThisPost(id: string) {
    confirm("Are you sure you want to Delete this Post") ? this.postService.deletePost(id) : {}
  }

  selectedPost(post: Post) {
    this.postService.selectedToEdit(post)
  }

}
