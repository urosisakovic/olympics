import { Component, OnInit } from '@angular/core';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-org-edit-sports',
  templateUrl: './org-edit-sports.component.html',
  styleUrls: ['./org-edit-sports.component.css']
})
export class OrgEditSportsComponent implements OnInit {

  constructor(private sportService: SportService) { }

  ngOnInit(): void {
  }

  selectedType!: string;
  selectedSportName!: string;
  selectedDisciplineName!: string;
  selectedMinPlayers!: number;
  selectedMaxPlayers!: number;

  addSport() {
    if (this.emptyData()) {
      alert("Sva polja moraju biti popunjena");
      return;
    }

    if (this.selectedDisciplineName == undefined) {
      this.selectedDisciplineName = "";
    }

    let minPlayerPlaceholder = -1;
    let maxPlayerPlaceholder = -1;

    if (this.selectedType == 'team')  {
      minPlayerPlaceholder = this.selectedMinPlayers;
      maxPlayerPlaceholder = this.selectedMaxPlayers;
    }

    this.sportService.addSportWithDiscipline(
      this.selectedSportName,
      this.selectedDisciplineName, 
      this.selectedType,
      minPlayerPlaceholder,
      maxPlayerPlaceholder).subscribe((data: any) => {
        if (data.message == "ok") {
          alert("Uspesno dodat sport");
        } else {
          alert("Doslo je do greske prilikom dodavanja sporta!");
        }
      });
  }

  emptyData() {
    if (this.selectedSportName == undefined || this.selectedSportName == null || this.selectedSportName == "") {
      return true;
    }

    if (this.selectedType == undefined || this.selectedType == null || this.selectedType == "") {
      return true;
    }

    if (this.selectedType == "team") {
      if (this.selectedMinPlayers == undefined || this.selectedMinPlayers == null) {
        alert('lala');
        return true;
      }

      if (this.selectedMaxPlayers == undefined || this.selectedMaxPlayers == null) {
        alert('lala');
        return true;
      }
    }

    return false;
  }

}
