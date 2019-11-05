import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Validator } from 'class-validator';
import { AuthService } from '../../core/services/auth.service';
import { NotificatorService } from '../../core/services/notificator.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'; // for customizing

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
    private readonly fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }

  ngOnInit() {}

  public login() {
    this.authService.login(this.loginForm.value).subscribe(
      () => {
        // this.notificator.success(`Login successful!`);
        Swal.fire({
          title: 'Login successful!',
          text: 'Welcome to our online library!',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        // this.dialogService.closeAll();
        this.router.navigate(['/home']);
        this.dialogService.closeAll();
      },
      () => this.notificator.error(`Invalid username/password!`)
    );
  }

  public sentTo() {
    this.dialogService.sentToRegister();
  }
}
