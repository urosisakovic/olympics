import { Injectable } from '@angular/core';
import { Participant } from './data/participant';
import { allParticipants } from './mockDB/participants';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor() { }

  getAllParticipants(): Participant[] {
    return allParticipants;
  }
}
