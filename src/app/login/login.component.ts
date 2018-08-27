import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  user;
  private isLoggedIn: Boolean;
  private userName: String;

  constructor(public loginService: LoginService) {
    this.loginService.user.subscribe(user => {
      if (user == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.userName = user.displayName;
        console.log(user);
      }
    });
  }

  ngOnInit() {
  }

  runLogin(email: string, password: string) {
    this.loginService.login(email, password);
  }

  runLogout() {
    this.loginService.logout();
  }
}
