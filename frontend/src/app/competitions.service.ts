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
      pickedParticipants: string[],
      tryCount: number,
      maxPoints: number) {
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
      pickedParticipants: pickedParticipants,
      tryCount: tryCount,
      maxPoints: maxPoints
    };

    return this.http.post(`${this.uri}/add-competition`, data);
  }

  updateState(compName: string, state: string[][]) {
    const data = {
      compName: compName,
      state: state
    };

    return this.http.post(`${this.uri}/update-competition`, data);
  }

  assignMedals(
    compName: string,
    goldMedalWinner: string,
    silverMedalWinner: string,
    bronzeMedalWinner: string) {
      const data = {
        name: compName,
        goldMedalWinner: goldMedalWinner,
        silverMedalWinner: silverMedalWinner,
        bronzeMedalWinner: bronzeMedalWinner
      };

      return this.http.post(`${this.uri}/assigne-medals`, data);
  }
}
