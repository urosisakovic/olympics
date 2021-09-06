import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { SportService } from '../sport.service';
import { Sport } from '../data/sport';
import { User } from '../data/user';
import { Participant } from '../data/participant';


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
    this.participantService.getAllParticipants().subscribe((data: any) => {
      this.allParticipants = data;
    });
  }

  allSports: string[] = [];

  relatedDisciplines: string[] = [];
  selectedDiscipline!: string;

  allSportsWithDisciplines!: Sport[];

  allDelegats!: User[];
  selectedDelegat!: User;

  selectedName!: string;
  selectedSport!: string;
  selectedGender!: string;
  selectedStartDateStr!: string;
  selectedEndDateStr!: string;
  selectedLocation!: string;
  selectedCompetitionFormat!: string;
  selectedResultFormat!: string;
  selectedMaxPoints!: number;
  selectedTryCount!: number;

  validPariticipants: Participant[] = [];
  pickedParticipants: Participant[] = [];
  selectedValidParticipant!: Participant;
  allParticipants!: Participant[];

  successMessage!: string;
  errorMessage!: string;

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

    if (this.selectedGender != undefined) {
      this.loadValidParticipants();
    }
  }

  createCompetition() {
    if (this.emptyData()) {
      alert("Sva polja moraju biti popunjena!");
      return;
    }

    alert(this.selectedName);
    alert(this.selectedSport);
    alert(this.selectedDiscipline);
    alert(this.selectedGender);
    alert(this.selectedStartDateStr);
    alert(this.selectedEndDateStr);
    alert(this.selectedLocation);
    alert(this.selectedDelegat.username)
  }

  emptyData() {
    if (this.selectedName == undefined || this.selectedName == "") {
      return true;
    }

    if (this.selectedSport == undefined) {
      return true;
    }

    if (this.selectedGender == undefined) {
      return true;
    }

    if (this.selectedStartDateStr == undefined || this.selectedStartDateStr == "") {
      return true;
    }

    if (this.selectedEndDateStr == undefined || this.selectedEndDateStr == "") {
      return true;
    }

    if (this.selectedLocation == undefined || this.selectedLocation == "") {
      return true;
    }

    if (this.selectedDelegat == undefined) {
      return true;
    }

    return false;
  }

  loadValidParticipants() {
    alert("loadValidParticipants");

    this.validPariticipants = [];

    for (let i = 0; i < this.allParticipants.length; i++) {
      if (this.allParticipants[i].sport == this.selectedSport) {
        if (this.allParticipants[i].disciplines.includes(this.selectedDiscipline)) {
          if (this.allParticipants[i].gender == this.selectedGender) {
            this.validPariticipants.push(this.allParticipants[i]);
          }
        }
      }
    }
  }

  onGenderSelect() {
    if (this.selectedSport != undefined) {
      this.loadValidParticipants();
    }
  }
}
