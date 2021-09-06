import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllCompetitions() {
    return this.http.get(`${this.uri}/all-competitions`);
  }

  addCompetition() {
    const data = {

    };

    return this.http.post(`${this.uri}/add-competition`, data);
  }
}
