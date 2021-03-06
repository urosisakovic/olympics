import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { SportService } from '../sport.service';
import { Sport } from '../data/sport';
import { User } from '../data/user';
import { Participant } from '../data/participant';
import { Country } from '../data/country';
import { CountriesService } from '../countries.service';
import { CompetitionsService } from '../competitions.service';


@Component({
  selector: 'app-org-edit-competitions',
  templateUrl: './org-edit-competitions.component.html',
  styleUrls: ['./org-edit-competitions.component.css']
})
export class OrgEditCompetitionsComponent implements OnInit {

  constructor(
    private participantService: ParticipantService,
    private sportService: SportService,
    private countryService: CountriesService,
    private competitionsService: CompetitionsService) { }

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
    this.countryService.getAllCountries().subscribe((data: any) => {
      this.allCountries = data;
    });
  }

  allSports: string[] = [];

  relatedDisciplines: string[] = [];
  selectedDiscipline!: string;

  allSportsWithDisciplines!: Sport[];

  allCountries!: Country[];

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

  validPariticipants: string[] = [];
  selectedValidParticipant!: string;

  pickedParticipants: string[] = [];
  allParticipants!: Participant[];

  successMessage: string = "";
  errorMessage: string = "";

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
      this.successMessage = "";
      this.errorMessage = "Sva polja moraju biti popunjena.";
      return;
    }

    if (this.selectedCompetitionFormat == "group" && this.pickedParticipants.length != 12) {
      this.successMessage = "";
      this.errorMessage = "Neophodno je 12 takmi??ara za taj format.";
      return;
    }

    if (this.selectedCompetitionFormat == "cup" && this.pickedParticipants.length != 16 && this.pickedParticipants.length != 8 && this.pickedParticipants.length != 4) {
      this.successMessage = "";
      this.errorMessage = "Neophodno je 4, 8 ili 16 takmi??ara za taj format.";
      return;
    }

    if (this.selectedCompetitionFormat == "finals" && this.pickedParticipants.length != 8) {
      this.successMessage = "";
      this.errorMessage = "Neophodno je 8 takmi??ara za taj format.";
      return;
    }

    if ((!this.isValidDate(this.selectedStartDateStr)) || (!this.isValidDate(this.selectedEndDateStr))) {
      this.successMessage = "";
      this.errorMessage = "Nepravilno uneti datumi.";
      return;
    }

    if (this.selectedCompetitionFormat == "finals") {
      if (this.selectedTryCount == undefined) {
        this.successMessage = "";
        this.errorMessage = "Nije unet broj poku??aja.";
      }
    }

    if (this.selectedTryCount == undefined) {
      this.selectedTryCount = -1;
    }
    if (this.selectedMaxPoints == undefined) {
      this.selectedMaxPoints = -1;
    }

    this.competitionsService.addCompetition(
      this.selectedName,
      this.selectedSport,
      this.selectedDiscipline,
      this.selectedGender,
      this.stringToDate(this.selectedStartDateStr),
      this.stringToDate(this.selectedEndDateStr),
      this.selectedLocation,
      this.selectedDelegat.username,
      this.selectedCompetitionFormat,
      this.selectedResultFormat,
      this.pickedParticipants,
      this.selectedTryCount,
      this.selectedMaxPoints
      ).subscribe((data: any) => {
      if (data) {
        if (data.message == "ok") {
          this.errorMessage = "";
          this.successMessage = "Takmi??enje je uspe??no napravljeno.";
          this.pickedParticipants = [];
          
          this.selectedName = "";
          this.selectedStartDateStr = "";
          this.selectedEndDateStr = "";
          this.selectedLocation = "";
        }
      } else {

      }
    })
  }

  stringToDate(str: string) {
    return new Date(
      parseInt(str.substring(6, 10)),
      parseInt(str.substring(3, 5)),
      parseInt(str.substring(0, 2))
    );
  }

  isValidDate(dateStr: string) {
    const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return re.test(String(dateStr).toLowerCase());
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

    if (this.selectedCompetitionFormat == undefined) {
      return true;
    }

    if (this.selectedResultFormat == undefined) {
      return true;
    }

    return false;
  }

  loadValidParticipants() {
    this.validPariticipants = [];

    if (this.individualSportSelected()) {
      for (let i = 0; i < this.allParticipants.length; i++) {
        if (this.allParticipants[i].sport == this.selectedSport) {
          if (this.allParticipants[i].disciplines.includes(this.selectedDiscipline)) {
            if (this.allParticipants[i].gender == this.selectedGender) {
              this.validPariticipants.push(this.allParticipants[i].name);
            }
          }
        }
      }
    } 
    else {
      for (let i = 0; i < this.allCountries.length; i++) {
        let cnt = 0;
        for (let j = 0; j < this.allParticipants.length; j++) {
          if (this.allParticipants[j].country == this.allCountries[i].name) {
            if (this.allParticipants[j].sport == this.selectedSport) {
              if (this.allParticipants[j].disciplines.includes(this.selectedDiscipline)) {
                if (this.allParticipants[j].gender == this.selectedGender) {
                  cnt++;
                }
              }
            }
          }
        }

        if (this.minPlayersReached(cnt)) {
          this.validPariticipants.push(this.allCountries[i].name);
        }
      }
    }
    
  }

  minPlayersReached(cnt: number) {
    for (let i = 0; i < this.allSportsWithDisciplines.length; i++) {
      if (this.allSportsWithDisciplines[i].name == this.selectedSport) {
        if (this.allSportsWithDisciplines[i].minPlayers <= cnt) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  individualSportSelected() {
    for (let i = 0; i < this.allSportsWithDisciplines.length; i++) {
      if (this.allSportsWithDisciplines[i].name == this.selectedSport) {
        if (this.allSportsWithDisciplines[i].type == "team") {
          return false;
        } else {
          return true;
        }
      }
    }

    return false;
  }

  onGenderSelect() {
    if (this.selectedSport != undefined) {
      this.loadValidParticipants();
    }
  }

  selectParticipant() {
    if (this.selectedValidParticipant == undefined) {
      return;
    }

    for (let i = 0; i < this.validPariticipants.length; i++) {
      if (this.validPariticipants[i] == this.selectedValidParticipant) {
        this.validPariticipants.splice(i, 1);
      }
    }

    this.pickedParticipants.push(this.selectedValidParticipant);
  }

  unselectParticipant(index: number) {
    let participantToBeDeleted = this.pickedParticipants[index];
    this.pickedParticipants.splice(index, 1);
    this.validPariticipants.push(participantToBeDeleted);
  }
}
