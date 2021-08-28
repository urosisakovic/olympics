import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country } from '../data/country';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private countriesService: CountriesService, private passwordService: PasswordService) { }

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

  register() {
    if (this.emptyData()) {
      alert("Sva polja moraju biti popunjena");
      return;
    }

    if (!(this.passwordService.isValidPassword(this.selectedPassword))) {
      alert("Nevalidna sifra");
      return;
    }

    if (this.selectedPassword != this.selectedRepeatedPassword) {
      alert("Ponovljena sifra se razlikuje od originalne");
      return;
    }

    
    

    alert("Zahtev za nalog je uspesno poslat");
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
