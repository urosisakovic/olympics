import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from '../competitions.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private competitionsService: CompetitionsService) { }

  ngOnInit(): void {
    this.competitionsService.getAllCompetitions().subscribe((data: any) => {
      this.allCompetitions = data;
    });
  }

  allCompetitions!: any[];
  selectedCompetition: any;
  selectedResult: string[] = [];

  onCompetitionSelectChange() {
    this.competitionsService.getAllCompetitions().subscribe((data: any) => {
      this.allCompetitions = data;

      for (let i = 0; i < this.selectedCompetition.pickedParticipants.length; i++) {
        this.selectedResult.push("");
      }
    });
  }

  createRange(num: number){
    return new Array(num);
  }

  addScore(index: number) {
    if (!this.validFormat()) {
      alert("Los format.");
      return;
    }

    this.selectedCompetition.state[index].push(this.selectedResult[index]);
    this.selectedResult[index] = "";

    this.competitionsService.updateState(this.selectedCompetition.name, this.selectedCompetition.state).subscribe((data: any) => {
      if (data && data.message) {
        alert("Sacuvano stanje!");
      } else {
        alert("Doslo je do greske!");
      }
    });

    if (this.finished()) {
      alert("Gotovo takmicenje, delimo medalje!");
      this.declareWinner();
    }

  }

  validFormat() {
    // TODO
    return true;
  }

  declareWinner() {
    // TODO: Podeli medalje, obrisi takmicenje
  }

  finished() {
    for (let i = 0; i < this.selectedCompetition.state.length; i++) {
      if (this.selectedCompetition.state[i].length < this.selectedCompetition.tryCount) {
        return false;
      }
    }

    return true;
  }

}
