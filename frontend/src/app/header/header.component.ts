import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("loggedUser") != null && localStorage.getItem("loggedUser") != undefined) {
      this.loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
      alert(this.loggedUser.type);
    }
  }

  loggedUser: any = null;

  logout() {
    localStorage.removeItem("loggedUser");
    this.router.navigate(['']); 
    setTimeout(function(){location.reload()}, 200);
  }

}
