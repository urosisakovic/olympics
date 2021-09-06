import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesService } from '../countries.service';
import { Country } from '../data/country';
import { PasswordService } from '../password.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private countriesService: CountriesService,
    private passwordService: PasswordService,
    private userService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe((data: any) => {
      this.allCountries = data;
    });
  }

  allCountries!: Country[];

  selectedUsername!: string;
  selectedPassword!: string;
  selectedRepeatedPassword!: string;
  selectedFirstName!: string;
  selectedLastName!: string;
  selectedCountry!: Country;
  selectedEmail!: string;
  selectedType!: string;

  successMessage: string = "";
  errorMessage: string = "";

  register() {
    if (this.emptyData()) {
      this.successMessage = "";
      this.errorMessage = "Sva polja moraju biti popunjena.";
      return;
    }

    if (!(this.passwordService.isValidPassword(this.selectedPassword))) {
      this.successMessage = "";
      this.errorMessage = "Nevalidna lozinka.";
      return;
    }

    if (this.selectedPassword != this.selectedRepeatedPassword) {
      this.successMessage = "";
      this.errorMessage = "Ponovljena sifra se razlikuje od originalne.";
      return;
    }

    if (!(this.isValidEmail(this.selectedEmail))) {
      this.successMessage = "";
      this.errorMessage = "Nevalidan email.";
      return;
    }

    this.userService.requestRegistration(
      this.selectedUsername,
      this.selectedPassword,
      this.selectedFirstName,
      this.selectedLastName,
      this.selectedCountry.name,
      this.selectedEmail,
      this.selectedType).subscribe((res: any) => {
        if (res.message == "ok") {
          this.errorMessage = "";
          this.successMessage = "Uspešno je poslat zahtev za registraciju! Budi strpljiv dok organizator ne odobri tvoj nalog.";
          
          this.selectedUsername = "";
          this.selectedPassword = "";
          this.selectedRepeatedPassword = "";
          this.selectedFirstName = "";
          this.selectedLastName = "";
          this.selectedEmail = "";
          this.selectedType = "";
        }
        else if (res.message == "username exists") {
          this.successMessage = "";
          this.errorMessage = "Korisničko ime je zauzeto.";
        } 
      });
  }

  isValidEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  emptyData() {
    if (this.selectedUsername == undefined || this.selectedUsername == "") {
      return true;
    }

    if (this.selectedPassword == undefined || this.selectedPassword == "") {
      return true;
    }

    if (this.selectedRepeatedPassword == undefined || this.selectedRepeatedPassword == "") {
      return true;
    }

    if (this.selectedFirstName == undefined || this.selectedFirstName == "") {
      return true;
    }

    if (this.selectedLastName == undefined || this.selectedLastName == "") {
      return true;
    }

    if (this.selectedEmail == undefined || this.selectedEmail == "") {
      return true;
    }

    if (this.selectedCountry == undefined) {
      return true;
    }

    if (this.selectedType == undefined || this.selectedType == "") {
      return true;
    }

    return false;
  }

}
