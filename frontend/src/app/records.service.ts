import { Injectable } from '@angular/core';
import { Record } from './data/record';
import { allRecords } from './mockDB/records';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor() { }

  getAllRecords(): Record[] {
    return allRecords;
  }
}
