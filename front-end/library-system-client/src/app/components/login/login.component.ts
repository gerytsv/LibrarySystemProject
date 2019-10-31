import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Validator } from 'class-validator';
import { AuthService } from '../../core/services/auth.service';
import { NotificatorService } from '../../core/services/notificator.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserLoginDTO } from '../../common/users/user-login-dto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  private readonly validator = new Validator();

  constructor(
    private readonly dialogService: DialogService,
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
   }

  ngOnInit() {
  }

  public login() {
    this.authService.login(
      this.loginForm.value
    )
    .subscribe(
      () => {
        this.notificator.success(`Login successful!`);
        this.dialogService.closeAll();
        this.router.navigate(['/home']);
        this.dialogService.closeAll();
      },
      () => this.notificator.error(`Invalid email/password!`),
    );

  }

  public sentTo() {
    this.dialogService.sentToRegister();
  }

}
