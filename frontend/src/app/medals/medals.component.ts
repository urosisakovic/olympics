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

      let chart1Columns: any[] = [];
      for (let i = 0; i < this.allCountries.length; i++) {
        chart1Columns.push([this.allCountries[i].name, this.allCountries[i].goldMedalsWon + this.allCountries[i].silverMedalsWon + this.allCountries[i].bronzeMedalsWon]);
      }

      c3.generate({
        bindto: '#country-chart',
        
        data: {
          columns: chart1Columns,
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 0.5
          }
        }
      });

    });
  }

  allCountries!: Country[];

}
