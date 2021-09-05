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
    this.countriesService.getAllCountries().subscribe((data: any) => {
      this.allCountries = data;
    });
    for (let i = 0; i < 10000; i++) { let j = i * i - i; console.log(j); }
  }

  allCountries!: Country[];

}
