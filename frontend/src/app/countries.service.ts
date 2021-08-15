import { Injectable } from '@angular/core';
import { Country } from './data/country';
import { allCountries } from './mockDB/countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() { }

  getAllCountries(): Country[] {
    return allCountries;
  }
}
