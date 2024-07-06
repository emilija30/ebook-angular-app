import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import {AlertController} from "@ionic/angular";


@Component({
  selector: 'update-book.modal',
  templateUrl: './update-book.modal.component.html',
  styleUrls: ['./update-book.modal.component.scss'],
})
export class UpdateBookModalComponent implements OnInit {

  @Input() bookName: string = '';
  @Input() bookAuthor: string = '';
  @Input() bookDescription: string = '';
  @Input() bookStrength: string = '';
  @Input() bookGenre: string = '';
  @Input() bookImageUrl: string = '';

  data: any[] = [
    {
      "Romance": "Romance",
      "Action": "Action",
      "Sci-fi": "Sci-fi",
      "Horror": "Horror"
    }
  ];

  
  @ViewChild("f", { static: true }) form: NgForm;

  constructor(private modalCtrl: ModalController, private authService: AuthService, private alertCtrl: AlertController) { }

  ngOnInit() { }

  async presentAlertUpdate() {
    const alert = await this.alertCtrl.create({
      header: 'Book updated!',
      message: 'You have successfully updated this book!',
      buttons: ['GOOD'],
    });

    await alert.present();
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onUpdateBook() {
    if (this.form.invalid) {
      return;
    }
    this.presentAlertUpdate()

    this.modalCtrl.dismiss({
      bookData: {
        name: this.form.value['name'],
        author: this.form.value['author'],
        description: this.form.value['description'],
        genre: this.form.value['genre'],
        imageUrl: this.form.value['imageUrl'],
        user_id: this.authService.getUserId()
      }
    }, 'confirm');
  }

}
