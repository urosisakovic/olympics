import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-edit-sports',
  templateUrl: './org-edit-sports.component.html',
  styleUrls: ['./org-edit-sports.component.css']
})
export class OrgEditSportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedType!: string;

  addSport() {
    alert(this.selectedType);
  }

}
