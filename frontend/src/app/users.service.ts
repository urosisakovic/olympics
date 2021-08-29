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

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/login`, data);
  }

  requestRegistration(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    country: string,
    email: string,
    type: string) {
      const data = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        country: country,
        email: email,
        type: type
      };

      return this.http.post(`${this.uri}/register-request`, data);
  }

}
