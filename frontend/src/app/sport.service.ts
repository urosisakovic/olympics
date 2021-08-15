import { Injectable } from '@angular/core';
import { Sport } from './data/sport';
import { allSports } from './mockDB/sport';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor() { }

  getAllSports(): Sport[] {
    return allSports;
  }
}
