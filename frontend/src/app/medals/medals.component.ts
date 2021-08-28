import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country } from '../data/country';

@Component({
  selector: 'app-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.css']
})
export class MedalsComponent implements OnInit {

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe((data: any) => {
      this.allCountries = data;
    });
  }

  allCountries!: Country[];

}
