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
    this.allSports = this.sportService.getAllSports();
    this.participantService.getAllDelegats().subscribe((data: User[]) => {
      this.allDelegats = data;
      this.isLoaded = true;
    });
  }

  isLoaded: boolean = false;

  allSports!: Sport[];
  allDelegats!: User[];

  selectedSport!: Sport;
  selectedGender!: string;
  selectedStartDateStr!: string;
  selectedStartDate!: Date;
  selectedEndsDateStr!: string;
  selectedEndDate!: Date;
  selectedLocation!: string;
  selectedDelegat!: User;
}
