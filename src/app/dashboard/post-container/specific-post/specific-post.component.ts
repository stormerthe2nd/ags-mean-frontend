import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/posts.model';

@Component({
  selector: 'app-specific-post',
  templateUrl: './specific-post.component.html',
  styleUrls: ['./specific-post.component.css']
})
export class SpecificPostComponent implements OnInit {
  @Input() post: Post;
  @Output() sendPostEmitter: EventEmitter<Post> = new EventEmitter()
  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

  deleteThisPost(id: string) {
    this.postService.deletePost(id)
  }

  sendPost(post: Post) {
    console.log(post)
    this.sendPostEmitter.emit(post)
  }
}
