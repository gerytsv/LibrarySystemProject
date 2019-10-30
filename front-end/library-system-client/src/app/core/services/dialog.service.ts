import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { SingleBookPreviewComponent } from '../../components/books/single-book-preview/single-book-preview.component';

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

  public openBookPreview() {
    this.dialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'my-class';
    this.dialog.open(SingleBookPreviewComponent, dialogConfig);
  }
}
