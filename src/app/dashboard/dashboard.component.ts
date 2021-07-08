import { Component } from '@angular/core'
import { Post } from '../posts';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html"
})

export class DashboardComponent {

  updated(): string {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
  }
  postsArr: Post[] = [{
    sno: 1,
    imgPath: ["https://source.unsplash.com/500x500/?nature"],
    des: `thought of as a group because of a common quality or qualities. type may suggest strong and clearly marked similarity throughout the items included so that each is typical of the group. one of three basic body types kind may suggest natural grouping. a zoo seemingly having animals of every kind sort often suggests some disparagement. the sort of newspaper dealing in sensational stories nature may imply inherent, essential resemblance rather than obvious or superficial likenesses. two problems of a similar nature description implies a group marked by agreement in all details belonging to a type as described or `,
    updated: this.updated(),
    active: true,
    category: ''
  },
  {
    sno: 1,
    imgPath: ["https://source.unsplash.com/500x500/?nature"],
    des: `thought of as a group because of a common quality or qualities. type may suggest strong and clearly marked similarity throughout the items included so that each is typical of the group. one of three basic body types kind may suggest natural grouping. a zoo seemingly having animals of every kind sort often suggests some disparagement. the sort of newspaper dealing in sensational stories nature may imply inherent, essential resemblance rather than obvious or superficial likenesses. two problems of a similar nature description implies a group marked by agreement in all details belonging to a type as described or `,
    updated: this.updated(),
    active: true,
    category: ''
  }
  ];

  constructor() {

  }

}