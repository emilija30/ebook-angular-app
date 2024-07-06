import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap, map } from "rxjs";
import { Book } from "./books/book-element/book-model";
import { AuthService } from "./auth/auth.service";
import { Favorite } from "./favorites/favorite-element/favorite-model";

interface BookData {
  name: string;
  author: string;
  description: string;
  genre: string;
  imageUrl: string;
  user_id: string;
  iconName: string;
}

interface FavoritesData {
  bookID: string;
  user_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  booksList: Book[] = []; 
  favoriteForDeleteId: string = ''; 
  id: string = ''; 
  isIt: boolean; 
  private _books = new BehaviorSubject<Book[]>([]);
  private _favorites = new BehaviorSubject<Book[]>([]);

  private auth = ``

  private baza: String = "https://ebook-ba8c1-default-rtdb.europe-west1.firebasedatabase.app";

  get books() {
    return this._books.asObservable();
  }

  get favorites() {
    return this._favorites.asObservable();
  }

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.isIt = false;
  }

  addBook(name: string,
    author: string,
    description: string,
    genre: string,
    imageUrl: string,
    user_id: string,
    iconName: string) {
    return this.http.post<{ id: string }>(`${this.baza}/books.json?auth=${this.authService.getToken()}`, {
      name, author, description, genre, imageUrl, user_id, iconName
    });
  }

  addFavorite(bookID: string,
    user_id: string) {
    return this.http.post<{ id: string }>(`${this.baza}/favorites.json?auth=${this.authService.getToken()}`, {
      bookID, user_id
    });
  }

  getBooks() {
    return this.http.get<{ [key: string]: BookData }>(`${this.baza}/books.json?auth=${this.authService.getToken()}`)
      .pipe(
        map((bookData) => {
          console.log(bookData);
          const books: Book[] = [];

          for (const key in bookData) {
            if (bookData.hasOwnProperty(key)) {
              books.push({
                id: key,
                name: bookData[key].name,
                author: bookData[key].author,
                description: bookData[key].description,
                genre: bookData[key].genre,
                imageUrl: bookData[key].imageUrl,
                user_id: bookData[key].user_id,
                iconName: bookData[key].iconName
              });
            }
          }

          return books;
        }),
        tap((books) => {
          this._books.next(books);
        })
      );
  }

  getBooksById() {
    return this.http.get<{ [key: string]: BookData }>(`${this.baza}/books.json?auth=${this.authService.getToken()}`)
      .pipe(
        map((bookData) => {
          console.log(bookData);
          const books: Book[] = [];

          for (const key in bookData) {
            if (bookData.hasOwnProperty(key) && bookData[key].user_id === this.authService.getUserId()) {
              books.push({
                id: key,
                name: bookData[key].name,
                author: bookData[key].author,
                description: bookData[key].description,
                genre: bookData[key].genre,
                imageUrl: bookData[key].imageUrl,
                user_id: bookData[key].user_id,
                iconName: bookData[key].iconName
              });
            }
          }
          
          return books;
        }),
        tap((books) => {
          this._books.next(books);
        })
      );
  }

  deleteBook(bookID: string) {
    return this.http.delete(`${this.baza}/books/${bookID}.json?auth=${this.authService.getToken()}`);
  }

  updateBook(id: string, updatedBook: { name: string, author: string, description: string, genre: string, imageUrl: string, iconName: string }) {
    return this.http.patch(`${this.baza}/books/${id}.json?auth=${this.authService.getToken()}`, updatedBook);
  }

  updateBookID(id: string, updatedBook: { name: string, author: string, description: string, genre: string, imageUrl: string, user_id: string, iconName: string }) {
    return this.http.put(`${this.baza}/books/${id}.json?auth=${this.authService.getToken()}`, updatedBook);
  }

  deleteFavorite(bookID: string) {
    let id2 = '';
    this.getFavoriteByBookIDAndUserId(bookID).subscribe(res => {
      id2 = res;
      console.log(res);
      return this.http.delete(`${this.baza}/favorites/${res}.json?auth=${this.authService.getToken()}`).subscribe();
    });
  }

  getFavoriteByBookIDAndUserId(bookID: string) {
    return this.http.get<{ [key: string]: FavoritesData }>(`${this.baza}/favorites.json?auth=${this.authService.getToken()}`)
      .pipe(
        map((favoritesData) => {
          console.log(favoritesData);
          for (const key in favoritesData) {
            if (favoritesData.hasOwnProperty(key) && favoritesData[key].user_id === this.authService.getUserId() && favoritesData[key].bookID === bookID) {
              this.favoriteForDeleteId = key;
            }
          }

          console.log(this.favoriteForDeleteId);
          return this.favoriteForDeleteId;
        })
      );
  }

  getFavoritesById() {
    return this.http.get<{ [key: string]: FavoritesData }>(`${this.baza}/favorites.json?auth=${this.authService.getToken()}`)
      .pipe(
        map((favoritesData) => {
          console.log(favoritesData);
          const favorites: Favorite[] = [];
          const booksF: Book[] = [];

          for (const key in favoritesData) {
            if (favoritesData.hasOwnProperty(key) && favoritesData[key].user_id === this.authService.getUserId()) {
              favorites.push({
                id: key,
                bookID: favoritesData[key].bookID,
                user_id: favoritesData[key].user_id
              });
            }
          }

          this.getBooks().subscribe((IDbooks) => {
            console.log(IDbooks);
            console.log(favorites);
            this.booksList = IDbooks;
            for (const favorite of favorites) {
              for (const book of this.booksList) {
                if (favorite.bookID === book.id && favorite.user_id === this.authService.getUserId()) {
                  console.log("POGODAK");
                  booksF.push({
                    id: book.id,
                    name: book.name,
                    author: book.author,
                    description: book.description,
                    genre: book.genre,
                    imageUrl: book.imageUrl,
                    user_id: book.user_id,
                    iconName: book.iconName
                  });
                }
              }
            }
          });

          console.log(booksF);
          return booksF;
        }),
        tap((booksF) => {
          this._books.next(booksF);
        })
      );
  }

  isItInFavorites(bookID: string) {
    return this.http.get<{ [key: string]: FavoritesData }>(`${this.baza}/favorites.json?auth=${this.authService.getToken()}`)
      .pipe(
        map((favoritesData) => {
          console.log(favoritesData);
          for (const key in favoritesData) {
            if (favoritesData.hasOwnProperty(key) && favoritesData[key].user_id === this.authService.getUserId() && favoritesData[key].bookID === bookID) {
              return true;
            }
          }
          return false;
        })
      );
  }
}
