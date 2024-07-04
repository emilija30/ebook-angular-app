import { Component, OnInit } from '@angular/core';
import { AddBookModalComponent } from "../add-book.modal/add-book.modal.component";
import { ModalController } from "@ionic/angular";
import { BookServiceService } from '../book-service.service';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private modalCtrl: ModalController, private bookService: BookServiceService, private authService: AuthService) { }

  ngOnInit() {}

  openModal() {
    this.modalCtrl.create({
      component: AddBookModalComponent
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);
        const userId = this.authService.getUserId();
        if (userId) { // Provera da li je userId definisan
          this.bookService.addBook(
            resultData.data.bookData.name,
            resultData.data.bookData.author,
            resultData.data.bookData.description,
            resultData.data.bookData.genre,
            resultData.data.bookData.imageUrl,
            userId,
            "heart-outline"
          ).subscribe((res) => {
            console.log(res);
          });
        } else {
          console.error('User ID is null or undefined');
          
        }
      }
    });
  }
}
