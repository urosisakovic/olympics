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

  onCompetitionSelectChange() {

  }

  createRange(num: number){
    return new Array(num);
  }

  addScore(index: number) {

  }

}
