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

  username!: string;
  password!: string;
  loggedUser!: User;

  errorMessage: string = "";

  login() {
    this.usersService.login(this.username, this.password).subscribe((user: any) => {

      if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.reload();
        
      }
      else {
        this.errorMessage = "Netačno korisničko ime ili lozinka.";
        return;
      }
    });
  }
}
