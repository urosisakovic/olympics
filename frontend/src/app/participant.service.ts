import { Injectable } from '@angular/core';
import { Participant } from './data/participant';
import { User } from './data/user';
import { Observable, of } from 'rxjs';
import { allParticipants } from './mockDB/participants';
import { allUsers } from './mockDB/users';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor() { }

  getAllParticipants(): Participant[] {
    return allParticipants;
  }

  getAllDelegats(): Observable<User[]> {
    return of(allUsers.filter((user) => {return user.type == 'delegat'}));
  }
}
