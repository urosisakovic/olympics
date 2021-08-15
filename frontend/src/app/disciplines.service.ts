import { Injectable } from '@angular/core';
import { Discipline } from './data/discipline';
import { allDisciplines } from './mockDB/disciplines';

@Injectable({
  providedIn: 'root'
})
export class DisciplinesService {

  constructor() { }

  getAllDisciplines(): Discipline[] {
    return allDisciplines;
  }

}
