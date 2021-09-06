import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from '../password.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private passwordService: PasswordService,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit(): void {
    if (localStorage.getItem("loggedUser") != null && localStorage.getItem("loggedUser") != undefined) {
      this.loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
    } else {
      this.router.navigate(['']); 
    }
  }

  loggedUser!: any;

  oldPassword: string = "";
  newPassword: string = "";
  repeatNewPassword: string = "";

  successMessage: string = "";
  errorMessage: string = "";

  changePassword() {
    if (this.loggedUser.password != this.oldPassword) {
      this.successMessage = "";
      this.errorMessage = "Netačna trenutna lozinka."
      return;
    }

    if (this.newPassword != this.repeatNewPassword) {
      this.successMessage = "";
      this.errorMessage = "Nova lozinka i ponovljena nova lozinka se razlikuju."
      return;
    }

    if (!this.passwordService.isValidChangedPassword(this.oldPassword, this.newPassword)) {
      this.successMessage = "";
      this.errorMessage = "Nevalidna nove lozinke."
      return;
    }

    this.userService.changePassword(this.loggedUser.username, this.oldPassword, this.newPassword).subscribe((data: any) => {
      if (data.message == "ok") {
        this.errorMessage = ""
        this.successMessage = "Uspešno promenjena šifra.";
      } else {
        this.errorMessage = "Došlo je do greške prilikom promene šifre."
        this.successMessage = "";
      }
    });
  }

}
