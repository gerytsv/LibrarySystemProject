import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Validator } from 'class-validator';
import { AuthService } from '../../core/services/auth.service';
import { NotificatorService } from '../../core/services/notificator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationValidator } from '../../core/validators/compare-password';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'; // for customizing

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private readonly validator = new Validator();
  public registerForm: FormGroup;
  public passwordFormGroup: FormGroup;

  constructor(
    private readonly dialogService: DialogService,
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.passwordFormGroup = this.fb.group(
      {
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        repeatPassword: ['', Validators.required]
      },
      {
        validator: RegistrationValidator.validate.bind(this)
      }
    );

    this.registerForm = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: this.passwordFormGroup.value.password
    });
  }

  ngOnInit() {}

  public register() {
    const user = {
      ...this.registerForm.value,
      password: this.passwordFormGroup.value.password
    };
    this.authService.register(user).subscribe(
      () => {
        // this.notificator.success(`Registration successful!`);
        Swal.fire({
          title: 'Register successful!',
          text: 'Welcome to our online library!',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        // then login
        this.authService
          .login({ username: user.username, password: user.password })
          .subscribe(() => {
            // this.notificator.success(`Login successful!`);
            this.router.navigate(['/home']);
            this.dialogService.closeAll();
          });
      },
      () => this.notificator.error(`Username is already taken`)
    );
  }

  public sentTo() {
    this.dialogService.sentToLogin();
  }
}
