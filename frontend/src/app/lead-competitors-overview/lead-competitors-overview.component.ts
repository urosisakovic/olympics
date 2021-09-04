import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../data/sport';
import { User } from '../data/user';
import { ParticipantService } from '../participant.service';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-lead-competitors-overview',
  templateUrl: './lead-competitors-overview.component.html',
  styleUrls: ['./lead-competitors-overview.component.css']
})
export class LeadCompetitorsOverviewComponent implements OnInit {

  constructor(
    private sportService: SportService,
    private participantService: ParticipantService,
    private router: Router
  ) { }

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

    this.participants = [];
    this.participantService.getAllParticipants().subscribe((data: any) => {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].country == this.loggedUser.country) {
            this.participants.push(data[i]);
          }
        }

        this.participantCount = this.participants.length;

        for (let i = 0; i < this.allSports.length; i++) {
          let cnt = 0;
          for (let j = 0; j < this.participants.length; j++) {
            if (this.allSports[i] == this.participants[j].sport) {
              cnt++;
            }
          }
          this.competitorsPerSport.push(cnt);
        }
      }
    });
  }

  loggedUser!: User;

  allSports!: string[];
  relatedDisciplines: string[] = [""];

  allSportsWithDisciplines!: Sport[];

  selectedSport!: string;
  selectedDiscipline!: string;

  participants!: any[];
  participantCount: number = 0;

  resultParticipants: any[] = [];

  competitorsPerSport: number[] = [];

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
  }

  refreshParticipants() {
    this.resultParticipants = [];

    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i].sport == this.selectedSport && this.participants[i].disciplines.includes(this.selectedDiscipline)) {
        this.resultParticipants.push(this.participants[i]);
      }
    }
  }

}
