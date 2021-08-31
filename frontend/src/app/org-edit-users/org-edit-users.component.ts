import { Component, OnInit } from '@angular/core';
import { RegistartionRequest } from '../data/registrationRequest';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-org-edit-users',
  templateUrl: './org-edit-users.component.html',
  styleUrls: ['./org-edit-users.component.css']
})
export class OrgEditUsersComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getAllRegistrationRequests().subscribe((data: any) => {
      this.allRegistrationRequests = data;
    });
  }

  allRegistrationRequests!: RegistartionRequest[];

  accept(username: string) {
    this.userService.acceptRegistrationRequest(username).subscribe((data: any) => {
      if (data.message == "ok") {
        alert("Uspesno dodat nalog");
      } else {
        alert("Doslo je do greske prilikom dodavanja naloga");
      }
    });
    this.removeFromTable(username);
  }

  decline(username: string) {
    this.userService.declineRegistrationRequest(username).subscribe((data: any) => {
      if (data.message == "ok") {
        alert("Uspesno odbijen nalog");
      } else {
        alert("Doslo je do greske prilikom odbijanja naloga");
      }
    });
    this.removeFromTable(username);
  }

  removeFromTable(username: string) {
    for (let i = 0; i < this.allRegistrationRequests.length; i++) {
      if (this.allRegistrationRequests[i].username == username) {
        this.allRegistrationRequests.splice(i, 1);
        return;
      }
    }
  }

}
