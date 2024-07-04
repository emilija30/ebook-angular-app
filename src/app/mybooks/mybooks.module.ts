import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MybooksPageRoutingModule } from './mybooks-routing.module';

import { MybooksPage } from './mybooks.page';
import { BooksPageModule } from '../books/books.module';
import {MybookElementComponent} from "./mybook-element/mybook-element.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MybooksPageRoutingModule,
    BooksPageModule
  ],
  declarations: [MybooksPage, MybookElementComponent]
})
export class MybooksPageModule {}
