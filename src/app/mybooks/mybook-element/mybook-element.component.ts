import {Component, Input, OnInit} from '@angular/core';
import { Book } from 'src/app/books/book-element/book-model';
import {MybooksPage} from "../mybooks.page";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-mybook-element',
  templateUrl: './mybook-element.component.html',
  styleUrls: ['./mybook-element.component.scss'],
})

export class MybookElementComponent  implements OnInit {

  @Input() book: Book = {
    id: "s1",
    name: "Pride and Prejudice",
    author: "Jane Austen",
    description: "lorem ipsum",
    genre: "Romance",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnPHnKZZyhf0oaWKuJ1pUjdV39cbOuB9XUBw&s",
    user_id: "9anSQbvku2SyIgTNTaale2lxtFv2",
    iconName: ''
  }
  constructor(private mbp: MybooksPage, private alertCtrl: AlertController) { }

  ngOnInit() {}

  async presentAlertDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Book deleted!',
      message: 'You have successfully deleted this book!',
      buttons: ['GOOD'],
    });

    await alert.present();
  }

  // async presentAlertUpdate() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Book updated!',
  //     message: 'You have successfully updated this book!',
  //     buttons: ['GOOD'],
  //   });

  //   await alert.present();
  // }

  deleteBook(bookID: string) {
    this.alertCtrl.create({
      header: "Deleting book",
      message: "Are you sure you want to delete this book from your list?",
      buttons:[
        {
          text: 'Delete',
          handler: () =>{
            console.log('Delete');
            this.mbp.deleteBook(bookID);
            this.presentAlertDelete();
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

  updateBook(id: string, name: String, author: String, description: String, genre: String, imageUrl: String, iconName: string) {
    this.mbp.updateBook(id, name, author, description, genre, imageUrl, iconName);
  }
}
