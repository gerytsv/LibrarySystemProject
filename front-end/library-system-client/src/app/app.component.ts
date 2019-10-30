import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './common/users/user';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'library-system-client';

  private loggedInSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private readonly authService: AuthService,
  ) {}

  public loggedIn: boolean;
  public user: User;

  public ngOnInit() {
    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe(
      loggedIn => this.loggedIn = loggedIn,
    );
    this.userSubscription = this.authService.loggedUser$.subscribe(
      user => this.user = user,
    );
  }

}
