import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ModalController} from "@ionic/angular";
import { BookServiceService } from '../book-service.service';
import { Book } from '../books/book-element/book-model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  books: Book[];
  private _favoriteSub: Subscription;
  constructor(private modalCtrl: ModalController, private bookService: BookServiceService) {
    this.books = [];
    this._favoriteSub= new Subscription();
  }

  ngOnInit() {
    this.bookService.getFavoritesById().subscribe((favoritesData)=>{
      this.books = favoritesData;
      console.log(this.books);
    });
  }

  deleteFavorite(bookID: string) {
   this.bookService.deleteFavorite(bookID);
  }

}
