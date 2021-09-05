import { Injectable } from '@angular/core';
import { Sport } from './data/sport';
import { HttpClient } from '@angular/common/http';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllSports() {
    return this.http.get(`${this.uri}/all-sports`);
  }

  addSportWithDiscipline(
      sport: string,
      discipline: string,
      type: string,
      minPlayers: number,
      maxPlayers: number) {
    const data = {
      sport: sport,
      discipline: discipline,
      type: type,
      minPlayers: minPlayers,
      maxPlayers: maxPlayers
    };

    return this.http.post(`${this.uri}/add-sport-with-discipline`, data);
  }
}
