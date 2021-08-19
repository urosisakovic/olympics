import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { allUsers } from './mockDB/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  login(username: String, password: String): Observable<any> {
    // TODO(urosisakovic): Add database connection
    return of(allUsers.filter((user) => {return user.username == username && user.password == password}));
  }

}
