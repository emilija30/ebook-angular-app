import {Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Book} from "./book-model";
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../auth/auth.service";
import { BookServiceService } from 'src/app/book-service.service'; 
import {BooksPage} from "../../books/books.page";

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrls: ['./book-element.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookElementComponent implements OnInit {

  mIName: string = "heart-outline";
  @Input() book: Book = {
    id: "s1",
    name: "Pride and Prejudice",
    author: "Jane Austen",
    description: "lorem ipsum",
    genre: "Romance",
    imageUrl: "https://www.dymocks.com.au/Pages/ImageHandler.ashx?q=9781435159631&w=&h=570",
    user_id: "9anSQbvku2SyIgTNTaale2lxtFv2",
    iconName: ""
  };
  constructor(private alertCtrl: AlertController, private authService: AuthService, private bookService: BookServiceService, private bp: BooksPage) { }

  ngOnInit() {

  }

  ionViewWillEnter(){

  }
  setName(bookID: string, iconName: string) {
    this.mIName = iconName;
  }

  status(id: string, name: string, author: string, description: string, genre: string, imageUrl: string, iconName: string) {
    const userId = this.authService.getUserId();
    if (userId === null) {
      console.error('User ID is null');
      return;
    }
  
    if (iconName == 'heart-outline') {
      this.bookService.addFavorite(id, userId).subscribe();
      this.bp.updateBookIcon(id, name, author, description, genre, imageUrl, "heart");
    } else {
      this.bookService.deleteFavorite(id);
      this.bp.updateBookIcon(id, name, author, description, genre, imageUrl, "heart-outline");
    }
  }

  openAlert(){

    this.alertCtrl.create({
      header: "Saving book",
      message: "Are you sure you want to save this book on your favorite list?",
      buttons:[
        {
          text: 'Save',
          handler: () =>{
            console.log('Save it');

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
            console.log('cancel');
          }
        }
      ]
    }).then((alert)=>{
      alert.present();
      
    });
  }


}
