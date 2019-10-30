import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Validator } from 'class-validator';
import { AuthService } from '../../core/services/auth.service';
import { NotificatorService } from '../../core/services/notificator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationValidator } from '../../core/validators/compare-password';

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
    private readonly router: Router,
  ) {
    this.passwordFormGroup = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      repeatPassword: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: this.passwordFormGroup.value.password
    });
  }

  ngOnInit() {

  }


  public register() {
    console.log({...this.registerForm.value, password: this.passwordFormGroup.value.password});
    const user = {...this.registerForm.value, password: this.passwordFormGroup.value.password};
    this.authService.register(user)
      .subscribe(
        () => {
          this.notificator.success(`Registration successful!`);

          // then login
          this.authService.login({username: user.username, password: user.password})
          .subscribe(
            () => {
              this.notificator.success(`Login successful!`);
              this.router.navigate(['/home']);
              this.dialogService.closeAll();
            },
            () => this.notificator.error(`Invalid email/password!`),
          );

        },
        () => this.notificator.error(`Username is already taken`),
      );
  }

  public sentTo() {
    this.dialogService.sentToLogin();
  }
}
