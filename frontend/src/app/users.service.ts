import { Injectable } from '@angular/core';
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

  acceptRegistrationRequest(username: string) {
    const data = {
      username: username
    };
    return this.http.post(`${this.uri}/accept-register-request`, data);
  }

  declineRegistrationRequest(username: string) {
    const data = {
      username: username
    };
    return this.http.post(`${this.uri}/decline-register-request`, data);
  }

  getAllRegistrationRequests() {
    return this.http.get(`${this.uri}/all-registration-requests`);
  }

  changePassword(username: string, oldPassword: string, newPassword: string) {
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    return this.http.post(`${this.uri}/change-password`, data);
  }

}
