import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './services/dialog.service';
import { SharedModule } from '../shared/shared.module';
import { NotificatorService } from './services/notificator.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { AllBooksResolver } from './resolvers/all-books.service';
import { BorrowedBooksResolver } from './resolvers/borrowed-books.service';



@NgModule({
  declarations: [],
  imports: [
     SharedModule
  ],
  providers: [DialogService, AuthService, NotificatorService, StorageService, AllBooksResolver, BorrowedBooksResolver],
  exports: [
  ]
})
export class CoreModule { }
