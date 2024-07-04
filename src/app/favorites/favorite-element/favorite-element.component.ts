import {Component, Input, OnInit} from '@angular/core';
import { Book } from 'src/app/books/book-element/book-model'; 
import {Favorite} from "./favorite-model";

@Component({
  selector: 'app-favorite-element',
  templateUrl: './favorite-element.component.html',
  styleUrls: ['./favorite-element.component.scss'],
})
export class FavoriteElementComponent  implements OnInit {
  @Input() book: Book = {
    id: "",
    name: "",
    author: "",
    description: "",
    genre: " ",
    imageUrl: "",
    user_id: "",
    iconName: ""
  }
  @Input() favorite: Favorite = {
    id: "",
    bookID: "",
    user_id: ""
  }

  constructor() {
  }

  ngOnInit() {
  }

}
