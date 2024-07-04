import { Component, OnInit } from '@angular/core';
import { AddBookModalComponent } from '../add-book.modal/add-book.modal.component';
import {ModalController} from "@ionic/angular";
import { BookServiceService } from '../book-service.service';
import { AuthService } from '../auth/auth.service';
import { Book } from '../books/book-element/book-model';
import {Subscription} from "rxjs";
import { UpdateBookModalComponent } from '../update-book.modal/update-book.modal.component';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.page.html',
  styleUrls: ['./mybooks.page.scss'],
})
export class MybooksPage implements OnInit {
  books: Book[];
  private _bookSub: Subscription;
  booksById: Book[];
  constructor(private modalCtrl: ModalController, private bookService: BookServiceService, private authService: AuthService) {
    this.books = [];
    this.booksById=[];
    this._bookSub= new Subscription();
  }

  ngOnInit() {
    this.bookService.getBooksById().subscribe((bookData)=>{
      console.log(bookData);
      this.books = bookData;
    });
  }

  ionViewWillEnter(){
    this.bookService.getBooksById().subscribe((bookData)=>{
      console.log(bookData);
      this.books = bookData;
    });

  }
  deleteBook(bookID: string) {
    this.bookService.deleteBook(bookID).subscribe(() =>{

        this.ngOnInit();
        this.ionViewWillEnter();
    });
  }

  openModal(){
    this.modalCtrl.create({
      component: AddBookModalComponent
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if(resultData.role === 'confirm') {
        console.log(resultData);
        const userId = this.authService.getUserId();
        if (userId) {
          this.bookService.addBook(
            resultData.data.bookData.name,
            resultData.data.bookData.author,
            resultData.data.bookData.description,
            resultData.data.bookData.genre,
            resultData.data.bookData.imageUrl,
            userId,
            "heart-outline").subscribe((res) =>{
            console.log(res);
            this.ngOnInit();
            this.ionViewWillEnter();
          });
        } else {
          console.error('User ID is null or undefined');
          
        }
      }
    });
  }


  updateBook(id: string, name: String, author: String, description: String, genre: String, imageUrl: String, iconName: string) {
    this.modalCtrl.create({
      component: UpdateBookModalComponent,
      componentProps: {'bookName' : name,
        'bookAuthor' : author,
        'bookDescription': description,
        'bookGenre' : genre,
        'bookImageUrl' : imageUrl
      }
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if(resultData.role === 'confirm') {
        console.log(resultData);
        const userId = this.authService.getUserId();
        if (userId) {
          this.bookService.updateBookID(
            id,
            {name: resultData.data.bookData.name,
              author: resultData.data.bookData.author,
              description: resultData.data.bookData.description,
              genre: resultData.data.bookData.genre,
              imageUrl: resultData.data.bookData.imageUrl,
              user_id: userId,
              iconName: iconName}
          ).subscribe((res) =>{
            console.log(res);
            this.ngOnInit();
            this.ionViewWillEnter();
          });
        } else {
          console.error('User ID is null or undefined');
          
        }
      }
    });
  }
}
