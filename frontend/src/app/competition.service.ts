import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  addCompetition() {
    const data = {

    };
    return this.http.post(`${this.uri}/add-competition`, data);
  }
}
