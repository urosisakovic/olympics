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
    if (!this.validFormat(this.selectedResult[index])) {
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

  validFormat(result: string) {
    if (this.selectedCompetition.resultFormat == "M,CM") {
      if (result.length != 4) {
        return false;
      }
      if (result[1] != ',') {
        return false;
      }
      if (!this.isDigit(result[0]) || !this.isDigit(result[2]) || !this.isDigit(result[3])) {
        return false;
      }

      return true;
    }
    else if (this.selectedCompetition.resultFormat == "SS,TT" || this.selectedCompetition.resultFormat == "MM,CM") {
      if (result.length != 5) {
        return false;
      }
      if (result[2] != ',') {
        return false;
      }
      if (!this.isDigit(result[0]) || !this.isDigit(result[1]) || !this.isDigit(result[3]) || !this.isDigit(result[4])) {
        return false;
      }

      return true;
    } 
    else if (this.selectedCompetition.resultFormat == "MM,SS,TT") {
      if (result.length != 8) {
        return false;
      }
      if (result[2] != ',' || result[6] != ',') {
        return false;
      }
      if (!this.isDigit(result[0]) || !this.isDigit(result[1]) || !this.isDigit(result[3]) || !this.isDigit(result[4]) || !this.isDigit(result[5]) || !this.isDigit(result[6])) {
        return false;
      }
    } 
    else if (this.selectedCompetition.resultFormat == "HH:MM:CC") {
      if (result.length != 8) {
        return false;
      }
      if (result[2] != ':' || result[6] != ':') {
        return false;
      }
      if (!this.isDigit(result[0]) || !this.isDigit(result[1]) || !this.isDigit(result[3]) || !this.isDigit(result[4]) || !this.isDigit(result[5]) || !this.isDigit(result[6])) {
        return false;
      }
    }
    else {
      alert("Nevalidan format rezultata!");
      return false;
    }

    return true;
  }

  isDigit(c: string) {
    if (c >= '0' && c <= '9') {
      return true;
    } else {
      return false;
    }
  }

  declareWinner() {
    let score = [];
    let tempPart = [];
    for (let i = 0; i < this.selectedCompetition.pickedParticipants.length; i++) {
      let bestParticipantScore = -1000000;
      for (let j = 0; j < this.selectedCompetition.tryCount; j++) {
        let points = this.convertToPoints(this.selectedCompetition.state[i][j]);
        if (points > bestParticipantScore) {
          bestParticipantScore = points;
        }
      }
      tempPart.push(this.selectedCompetition.pickedParticipants[i]);
      score.push(bestParticipantScore);
    }

    for (let i = 0; i < score.length; i++) {
      for (let j = i + 1; j < score.length; j++) {
        if (score[i] > score[j]) {
          let tempS: any = score[i];
          score[i] = score[j];
          score[j] = tempS;

          let tempP: any = tempPart[i];
          tempPart[i] = tempPart[j];
          tempPart[j] = tempP;
        }
      }
    }

    let goldMedalWinner = tempPart[tempPart.length - 1];
    let silverMedalWinner = tempPart[tempPart.length - 2];
    let bronzeMedalWinner = tempPart[tempPart.length - 3];

    alert(goldMedalWinner)
    alert(silverMedalWinner);
    alert(bronzeMedalWinner);
  }

  convertToPoints(result: string) {
    if (this.selectedCompetition.resultFormat == "M,CM") {
      let m = parseInt(result[0]);
      let cd = parseInt(result[2]);
      let cu = parseInt(result[3]);
      return m * 100 + cd * 10 + cu;
    }
    else if (this.selectedCompetition.resultFormat == "MM,CM") {
      let md = parseInt(result[0]);
      let mu = parseInt(result[1]);
      let cd = parseInt(result[3]);
      let cu = parseInt(result[4]);
      return md * 1000 + mu * 100 + cd * 10 + cu;
    }
    else if (this.selectedCompetition.resultFormat == "SS,TT") {
      let sd = parseInt(result[0]);
      let su = parseInt(result[1]);
      let td = parseInt(result[3]);
      let tu = parseInt(result[4]);
      return -1 * (sd * 1000 + su * 100 + td * 10 + tu);
    }
    else if (this.selectedCompetition.resultFormat == "MM,SS,TT") {
      let md = parseInt(result[0]);
      let mu = parseInt(result[1]);
      let sd = parseInt(result[3]);
      let su = parseInt(result[4]);
      let td = parseInt(result[6]);
      let tu = parseInt(result[7]);
      return -1 * (md * 100000 + mu*10000 + sd * 1000 + su * 100 + td * 10 + tu);
    }
    else if (this.selectedCompetition.resultFormat == "HH:MM:CC") {
      let md = parseInt(result[0]);
      let mu = parseInt(result[1]);
      let sd = parseInt(result[3]);
      let su = parseInt(result[4]);
      let td = parseInt(result[6]);
      let tu = parseInt(result[7]);
      return -1 * (md * 100000 + mu*10000 + sd * 1000 + su * 100 + td * 10 + tu);
    }

    return -1;
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
