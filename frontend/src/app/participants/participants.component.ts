import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country } from '../data/country';
import { Participant } from '../data/participant';
import { Sport } from '../data/sport';
import { ParticipantService } from '../participant.service';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  constructor(
    private participantService: ParticipantService,
    private countriesService: CountriesService,
    private sportService: SportService) { }

  ngOnInit(): void {
    this.participantService.getAllParticipants().subscribe((data: any) => {
      this.allParticipants = data;
    });
    this.countriesService.getAllCountries().subscribe((data: any) => {
      this.allCountries = data;
    });
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

    this.selectedCountry = "all";
    this.selectedSport = "all";
    this.selectedDiscipline = "all";
  }

  allParticipants!: Participant[];
  selectedParticipants!: Participant[];

  allCountries!: Country[];
  allSportsWithDisciplines!: Sport[];
  allSports!: string[];
  relatedDisciplines: string[] = [];

  selectedName!: string;
  selectedCountry!: string;
  selectedOnlyMedalWinners!: boolean;
  selectedSport!: string;
  selectedDiscipline!: string;

  maleParticipants: boolean = false;
  femaleParticipants: boolean = false;

  notClicked: boolean = true;

  searchParticipants() {
    // this.participantService.queryParticipants(
    //   this.selectedName,
    //   this.selectedCountry.name,
    //   this.selectedSport,
    //   this.selectedDiscipline,
    //   this.maleParticipants,
    //   this.femaleParticipants,
    //   this.selectedOnlyMedalWinners).subscribe((data: any) => {

    //   });

    this.notClicked = false;

    this.selectedParticipants = [];
    for (let i = 0; i < this.allParticipants.length; i++) {
      if (!this.checkName(this.allParticipants[i])) {
        continue;
      }
      if (!this.checkCountry(this.allParticipants[i])) {
        continue;
      }
      if (!this.checkSport(this.allParticipants[i])) {
        continue;
      }
      if (!this.checkDiscipline(this.allParticipants[i])) {
        continue;
      }
      if (!this.checkGender(this.allParticipants[i])) {
        continue;
      }
      if (!this.checkOnlyMedalWinners(this.allParticipants[i])) {
        continue;
      }

      this.selectedParticipants.push(this.allParticipants[i]);
    }
  }

  checkName(p: Participant) {
    if (this.selectedName == undefined || this.selectedName == "") {
      return true;
    }

    return this.selectedName == p.name;
  }

  checkCountry(p: Participant) {
    if (this.selectedCountry == undefined || this.selectedCountry == "all") {
      return true;
    }

    return this.selectedCountry == p.country;
  }

  checkSport(p: Participant) {
    if (this.selectedSport == undefined || this.selectedSport == "all") {
      return true;
    }

    return this.selectedSport == p.sport;
  }

  checkDiscipline(p: Participant) {
    if (this.selectedDiscipline == undefined || this.selectedDiscipline == "all") {
      return true;
    }

    return p.disciplines.includes(this.selectedDiscipline);
  }

  checkGender(p: Participant) {
    if (this.maleParticipants && this.femaleParticipants) {
      return true;
    }
    if (!this.maleParticipants && !this.femaleParticipants) {
      return true;
    }
    if (this.maleParticipants && p.gender == "M") {
      return true;
    }
    if (this.femaleParticipants && p.gender == "F") {
      return true;
    }

    return false;
  }

  checkOnlyMedalWinners(p: Participant) {
    if (!this.selectedOnlyMedalWinners) {
      return true;
    }

    return p.goldMedalsWon + p.silverMedalsWon + p.bronzeMedalsWon > 0;
  }

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

}
