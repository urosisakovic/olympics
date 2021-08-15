import { Component, OnInit } from '@angular/core';
import { Participant } from '../data/participant';
import { ParticipantService } from '../participant.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.allParticipants = this.participantService.getAllParticipants();
  }

  name!: string;
  allParticipants!: Participant[];
  selectedParticipants!: Participant[];

  searchParticipants() {
    alert(this.name);
  }

}
