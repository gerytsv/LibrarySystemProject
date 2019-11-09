import { BookDTO } from './../../components/books/models/book.dto';
import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { SingleBookPreviewComponent } from '../../components/books/single-book-preview/single-book-preview.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private readonly dialog: MatDialog) {}

  public sentToLogin() {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'my-class';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  public sentToRegister() {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'my-class';
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  public closeAll() {
    this.dialog.closeAll();
  }

  public openBookPreview(data) {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'my-class';
    dialogConfig.minHeight = 1000;
    dialogConfig.minWidth = 800;
    dialogConfig.position = {
      top: '0',
      left: '0',
      bottom: '0',
      right: '0'
    };

    this.dialog.open(SingleBookPreviewComponent, dialogConfig);
  }
}
