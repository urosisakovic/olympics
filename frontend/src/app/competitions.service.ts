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

  addCompetition(
      name: string,
      sport: string,
      discipline: string,
      gender: string,
      startDate: Date,
      endDate: Date,
      location: string,
      delegatUsername: string,
      competitionFormat: string,
      resultFormat: string,
      pickedParticipants: string[]) {
    const data = {
      name: name,
      sport: sport,
      discipline: discipline,
      gender: gender,
      startDate: startDate,
      endDate: endDate,
      location: location,
      delegatUsername: delegatUsername,
      competitionFormat: competitionFormat,
      resultFormat: resultFormat,
      pickedParticipants: pickedParticipants
    };

    return this.http.post(`${this.uri}/add-competition`, data);
  }
}
