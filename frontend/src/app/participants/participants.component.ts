import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country } from '../data/country';
import { Discipline } from '../data/discipline';
import { Participant } from '../data/participant';
import { Sport } from '../data/sport';
import { DisciplinesService } from '../disciplines.service';
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
    private sportService: SportService,
    private disciplineService: DisciplinesService) { }

  ngOnInit(): void {
    this.allParticipants = this.participantService.getAllParticipants();
    this.allCountries = this.countriesService.getAllCountries();
    this.allSports = this.sportService.getAllSports();
    this.allDisciplines = this.disciplineService.getAllDisciplines();
  }

  allParticipants!: Participant[];
  selectedParticipants!: Participant[];

  allCountries!: Country[];
  allSports!: Sport[];
  allDisciplines!: Discipline[];

  selectedName!: string;
  selectedCountry!: Country;
  selectedGender!: string;
  selectedOnlyMedalWinners!: boolean;
  selectedSport!: Sport;
  selectedDiscipline!: Discipline;

  searchParticipants() {
    if (this.selectedName == undefined)
      alert("Nerma filter za ime");
    else
      alert(this.selectedName);

    if (this.selectedCountry == undefined)
      alert("Sve zemlje");
    else
      alert(this.selectedCountry.name);

    if (this.selectedSport == undefined)
      alert("Svi sportovi");
    else
      alert(this.selectedSport.name);

    alert(this.selectedGender);

    if (this.selectedOnlyMedalWinners == undefined)
      alert("Svi")
    alert(this.selectedOnlyMedalWinners);
    console.log(this.selectedName);
  }

}
