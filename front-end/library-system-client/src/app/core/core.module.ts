import { NgModule } from '@angular/core';
import { DialogService } from './services/dialog.service';
import { NotificatorService } from './services/notificator.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { AllBooksResolver } from './resolvers/all-books.service';
import { BorrowedBooksResolver } from './resolvers/borrowed-books.service';
import { SearchService } from './services/search.service';
import { RatedBooksResolver } from './resolvers/rated-books.service';
import { ReviewedBooksResolver } from './resolvers/reviewed-books.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { AuthGuard } from '../common/auth/auth.guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    AuthGuard,
    DialogService,
    AuthService,
    NotificatorService,
    StorageService,
    AllBooksResolver,
    BorrowedBooksResolver,
    RatedBooksResolver,
    ReviewedBooksResolver
  ],
  exports: []
})
export class CoreModule {}
