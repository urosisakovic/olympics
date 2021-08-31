import { Injectable } from '@angular/core';
import { Participant } from './data/participant';
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
}
