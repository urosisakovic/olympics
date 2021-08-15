import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country } from '../data/country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.allCountries = this.countriesService.getAllCountries();
  }

  allCountries!: Country[];

}
