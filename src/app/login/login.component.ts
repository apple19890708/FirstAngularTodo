import { LoginService } from './../@services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPost } from '../@models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginValue: LoginPost = {
    AccountName: '',
	  Password: '',
  }
  constructor(private router: Router, private loginService: LoginService ) { }
  

  ngOnInit(): void {
  }

  login() {
    this.loginService.JWT登入(this.loginValue).subscribe((data: any) => {
      if (data) {
        localStorage.setItem('jwt', data);
        this.router.navigateByUrl('/manage/home');
      }
    });
    // this.router.navigateByUrl('/manage/home');
  }

}
