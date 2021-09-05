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

    c3.generate({
      bindto: '#country-chart',
      
      data: {
        columns: [
          ['Srbija', 10],
          ['Grcka', 8],
          ['SAD', 42],
          ['Nemacka', 1],
          ['Francuska', 8],
          ['Rusija', 60]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5
        }
      }
    });

    c3.generate({
      bindto: '#sport-chart',
      
      data: {
        columns: [
          ['Srbija', 10],
          ['Grcka', 8],
          ['SAD', 42],
          ['Nemacka', 1],
          ['Francuska', 8],
          ['Rusija', 60]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5
        }
      }
    });
  }

  allCountries!: Country[];

}
