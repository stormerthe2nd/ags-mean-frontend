import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {
  @Input() loading: boolean
  @Input() loadIndex: number
  @Input() categoriesLength: number
  constructor() { }

  ngOnInit(): void {
  }

}
