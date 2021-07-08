import { Component, Input } from '@angular/core';
import { Post } from '../posts';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() postsArr: Post[];
  @Input() today: string;
  constructor() {
  }

  addPost(desInp: HTMLTextAreaElement, fileInp: HTMLInputElement): void {
    let imgPaths: Array<string> = []
    imgPaths.push(`${fileInp.value}`)
    this.postsArr.push({
      sno: this.postsArr.length + 1,
      imgPath: imgPaths,
      des: desInp.value,
      updated: this.today,
      active: true,
      category: ''
    })
    console.log(this.postsArr)
  }

}
