import { Injectable } from '@angular/core';
import { Participant } from './data/participant';
import { User } from './data/user';
import { allParticipants } from './mockDB/participants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllParticipants(): Participant[] {
    return allParticipants;
  }

  getAllDelegats() {
    return this.http.get(`${this.uri}/all-delegats`); 
  }
}
