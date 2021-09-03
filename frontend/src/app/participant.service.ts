import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllParticipants() {
    return this.http.get(`${this.uri}/all-participants`);
  }

  getAllDelegats() {
    return this.http.get(`${this.uri}/all-delegats`);
  }

  addParticipant(
    country: string,
    name: string,
    gender: string,
    sport: string,
    discipline: string
  ) {
    const data = {
      country: country,
      name: name,
      gender: gender,
      sport: sport,
      discipline: discipline
    };

    alert("Sending post request...");
    return this.http.post(`${this.uri}/add-participants`, data);
  }
}
