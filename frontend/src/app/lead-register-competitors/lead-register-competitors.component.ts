import { Component, OnInit } from '@angular/core';
import { Sport } from '../data/sport';
import { User } from '../data/user';
import { ParticipantService } from '../participant.service';
import { SportService } from '../sport.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lead-register-competitors',
  templateUrl: './lead-register-competitors.component.html',
  styleUrls: ['./lead-register-competitors.component.css']
})
export class LeadRegisterCompetitorsComponent implements OnInit {

  constructor(
    private sportService: SportService,
    private participantService: ParticipantService,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("loggedUser") != null && localStorage.getItem("loggedUser") != undefined) {
      this.loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
      if (this.loggedUser.type != 'lead') {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }

    this.sportService.getAllSports().subscribe((data: any) => {
      this.allSportsWithDisciplines = data;

      this.allSports = [];

      for (let i = 0; i < this.allSportsWithDisciplines.length; i++) {
        if (this.allSports.includes(this.allSportsWithDisciplines[i].name)) {
          continue;
        } else {
          this.allSports.push(this.allSportsWithDisciplines[i].name);
        }
      }

      this.selectedSport = this.allSports[0];

    });

    this.selectedDiscipline = "";
  }

  loggedUser!: User;

  allSports!: string[];
  relatedDisciplines: string[] = [""];

  allSportsWithDisciplines!: Sport[];

  selectedSport!: string;
  selectedDiscipline!: string;
  selectedFirstName!: string;
  selectedLastName!: string;
  selectedGender!: string;

  onSportSelectChange() {
    if (this.selectedSport == null || this.selectedSport == undefined) {
      return;
    }

    this.relatedDisciplines = [];
    for (let i = 0; i < this.allSportsWithDisciplines.length; i++) {
      if (this.allSportsWithDisciplines[i].name == this.selectedSport) {
        this.relatedDisciplines.push(this.allSportsWithDisciplines[i].discipline);
      }
    }

    this.selectedDiscipline = this.relatedDisciplines[0];
    alert('this.selectedDiscipline ' + this.selectedDiscipline);
  }

  addPariticipant() {
    if (this.addParticipantEmptyData()) {
      alert("Sva polja moraju biti popunjena");
      return;
    }

    this.participantService.addParticipant(
      this.loggedUser.country,
      this.selectedFirstName + " " + this.selectedLastName,
      this.selectedGender,
      this.selectedSport,
      this.selectedDiscipline).subscribe((data: any) => {

      });
  }

  addParticipantEmptyData() {
    if (this.selectedSport == undefined || this.selectedSport == null  || this.selectedSport == "") {
      return true;
    }

    if (this.selectedDiscipline == undefined || this.selectedDiscipline == null) {
      return true;
    }

    if (this.selectedFirstName == undefined || this.selectedFirstName == null  || this.selectedFirstName == "") {
      return true;
    }

    if (this.selectedLastName == undefined || this.selectedLastName == null  || this.selectedLastName == "") {
      return true;
    }

    if (this.selectedGender == undefined || this.selectedGender == null  || this.selectedGender == "") {
      return true;
    }

    return false;
  }

}
