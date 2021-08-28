import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { allUsers } from './mockDB/users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username: String, password: String) {
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/login`, data);
  }

}
