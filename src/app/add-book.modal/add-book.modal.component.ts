import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-add-book.modal',
  templateUrl: './add-book.modal.component.html',
  styleUrls: ['./add-book.modal.component.scss'],
})
export class AddBookModalComponent  implements OnInit {

  // @ts-ignore
  @ViewChild("f", {static: true}) form: NgForm;
  constructor(private modalCtrl: ModalController, private authService: AuthService) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddBook() {
    if(this.form.invalid) {
      return;
    }
    this.modalCtrl.dismiss({bookData: {
        name: this.form.value['name'],
        author: this.form.value['author'],
        description: this.form.value['description'],
        genre: this.form.value['genre'],
        imageUrl: this.form.value['imageUrl'],
        user_id: this.authService.getUserId()
      }}, 'confirm');



  }

}
