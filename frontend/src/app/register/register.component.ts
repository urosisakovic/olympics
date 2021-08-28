import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country } from '../data/country';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private countriesService: CountriesService) { }

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
    alert(this.selectedUsername);
    alert(this.selectedPassword);
    alert(this.selectedRepeatedPassword);
    alert(this.selectedFirstName);
    alert(this.selectedLastName);
    alert(this.selectedEmail);
  }

}
