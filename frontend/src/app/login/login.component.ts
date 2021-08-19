import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../data/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    if (localStorage.getItem("loggedUser") != null && localStorage.getItem("loggedUser") != undefined) {
      this.loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
      this.router.navigate(['']);
    }
  }

  username!: String;
  password!: String;
  loggedUser!: User;

  login() {
    this.usersService.login(this.username, this.password).subscribe((user: User[]) => {

      if (user == null || user == undefined || user.length < 1) {
        alert("invalid username or password");
        return;
      }

      localStorage.setItem("loggedUser", JSON.stringify(user[0]));
      window.location.reload();
    })
  }
}