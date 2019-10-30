import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../common/users/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() loggedIn: boolean;
  @Input() user: User;

  constructor(
    private readonly dialogService: DialogService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
  }

  public onLogin() {
    this.dialogService.sentToLogin();
  }

  public onRegister() {
  this.dialogService.sentToRegister();
  }

  public onLogout() {
    this.authService.logout();
  }


}
