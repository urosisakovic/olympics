import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllRecords() {
    return this.http.get(`${this.uri}/all-records`);
  }
}
