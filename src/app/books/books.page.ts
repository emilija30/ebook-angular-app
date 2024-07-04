import {Component, OnDestroy, OnInit} from '@angular/core';
import { BookServiceService } from 'src/app/book-service.service'; 
import {Book} from "./book-element/book-model";
import {Subscription} from "rxjs";
import {ViewWillEnter} from "@ionic/angular";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit, OnDestroy, ViewWillEnter {
  searchTerm: string = '';
  filteredBooks: Book[] = [];
  private _bookSub: Subscription = new Subscription();
  private _favorites: Subscription = new Subscription();
  books: Book[] = [];
  favorites: Book[] = [];
  iconName: string = '';

  constructor(private bookService: BookServiceService, private authService: AuthService) {}

  ngOnInit() {
    this._bookSub = this.bookService.books.subscribe((bookData) => {
      this.books = bookData;
      this.filteredBooks = this.books;
    });
  }

  ionViewWillEnter() {
    this.bookService.getBooks().subscribe((bookData) => {
      this.books = bookData;
      this.filteredBooks = this.books;
    });
  }

  filterResults(search: string) {
    if (!search) {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book => book?.name.toLowerCase().includes(search.toLowerCase()));
    }
  }

  ngOnDestroy() {
    if (this._bookSub) {
      this._bookSub.unsubscribe();
    }
  }

  updateBookIcon(id: string, nameS: string, authorS: string, descriptionS: string, genreS: string, imageUrlS: string, iconNameS: string) {
    this.bookService.updateBook(
      id,
      {
        name: nameS,
        author: authorS,
        description: descriptionS,
        genre: genreS,
        imageUrl: imageUrlS,
        iconName: iconNameS
      }
    ).subscribe(() => {
      this.ngOnInit();
      this.ionViewWillEnter();
    });
  }
}
