import { Injectable } from '@angular/core';
import { Sport } from './data/sport';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllSports() {
    return this.http.get(`${this.uri}/all-sports`);
  }
}
