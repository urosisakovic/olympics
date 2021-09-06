import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { SportService } from '../sport.service';
import { Sport } from '../data/sport';
import { User } from '../data/user';


@Component({
  selector: 'app-org-edit-competitions',
  templateUrl: './org-edit-competitions.component.html',
  styleUrls: ['./org-edit-competitions.component.css']
})
export class OrgEditCompetitionsComponent implements OnInit {

  constructor(
    private participantService: ParticipantService,
    private sportService: SportService) { }

  ngOnInit(): void {
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
    });
    this.participantService.getAllDelegats().subscribe((data: any) => {
      this.allDelegats = data;
    });
  }

  allSports!: string[];

  relatedDisciplines: string[] = [];
  selectedDiscipline!: string;

  allSportsWithDisciplines!: Sport[];

  allDelegats!: User[];
  selectedDelegat!: User;

  selectedSport!: string;
  selectedGender!: string;
  selectedStartDateStr!: string;
  selectedEndsDateStr!: string;
  selectedLocation!: string;

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

    if (this.relatedDisciplines.length == 1 && this.relatedDisciplines[0] == "") {
      this.relatedDisciplines = [];
    }
  }

  createCompetition() {
    
  }
}
