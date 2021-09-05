import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country } from '../data/country';
import * as c3 from 'c3';

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

    let chart = c3.generate({
      bindto: '#chart',
      
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  }

  allCountries!: Country[];

}
