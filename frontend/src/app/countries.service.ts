import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from './data/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllCountries() {
    return this.http.get(`${this.uri}/all-countries`);
  }
}
