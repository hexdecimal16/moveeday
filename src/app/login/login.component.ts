import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  identicon: string;
  text: string;
  private generatedHash;
  constructor( public auth: AuthService ) { }
s
  ngOnInit() { }

  close() {
    return (this.auth.returnHome());
  }

  toggleSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-toggle').style.backgroundColor = '#fff';
    document.getElementById('login-toggle').style.color = 'black';
    document.getElementById('signup-toggle').style.backgroundColor = '#57b846';

  }

  toggleLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('signup-toggle').style.backgroundColor = '#fff';
    document.getElementById('signup-toggle').style.color = 'black';
    document.getElementById('login-toggle').style.backgroundColor = '#57b846';

  }

  submit() {
    if (this.text.length === 0) {
      document.getElementById('avatar').style.display = 'none';
    } else {
      document.getElementById('avatar').style.display = 'flex';
    }
    this.generatedHash = this.generateHash(this.text);
    console.log(this.generatedHash);
    this.identicon = this.createIdenticon(this.generatedHash);
  }

  // Generate identicon
  createIdenticon(emailHash: any): string {
    return 'https://www.gravatar.com/avatar/' + emailHash + '?d=identicon';
  }

  generateHash(s: any) {
    let h = 0;
    const l = s.length;
    let i = 0;
    if ( l > 0 ) {
      while (i < l) {
        // tslint:disable-next-line:no-bitwise
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
      }
    }
    return h;
  }

  loginWithEmail() {
    // @ts-ignore
    const email = document.getElementById('email1').value;
    // @ts-ignore
    const pass = document.getElementById('password1').value;
    const flag = this.auth.loginWithEmail(email, pass);
    if (flag) {
      this.auth.returnHome();
    }
  }

  signup() {
    // @ts-ignore
    const email = document.getElementById('email').value;
    // @ts-ignore
    const pass = document.getElementById('password').value;
    // @ts-ignore
    const username = document.getElementById('username').value;
    const flag = this.auth.signUpEmail(email, pass, this.identicon, username);
  }

}
