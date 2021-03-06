import { Component, OnInit } from '@angular/core';
import { Sport } from '../data/sport';
import { User } from '../data/user';
import { ParticipantService } from '../participant.service';
import { SportService } from '../sport.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-lead-register-competitors',
  templateUrl: './lead-register-competitors.component.html',
  styleUrls: ['./lead-register-competitors.component.css']
})
export class LeadRegisterCompetitorsComponent implements OnInit {

  constructor(
    private sportService: SportService,
    private participantService: ParticipantService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem("loggedUser") != null && localStorage.getItem("loggedUser") != undefined) {
      this.loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
      if (this.loggedUser.type != 'lead') {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }

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

      this.selectedSport = this.allSports[0];

    });

    this.selectedDiscipline = "";
  }

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  loggedUser!: User;

  allSports!: string[];
  relatedDisciplines: string[] = [""];

  allSportsWithDisciplines!: Sport[];

  selectedSport!: string;
  selectedDiscipline!: string;
  selectedFirstName!: string;
  selectedLastName!: string;
  selectedGender!: string;
  fileName!: string;

  selectedFile!: File;

  successMessage: string = "";
  errorMessage: string = "";

  isJSONFile(filepath: string) {
    let allowedExtenstion = ".json";
    if (filepath.substr(filepath.length - allowedExtenstion.length, allowedExtenstion.length).toLowerCase() == allowedExtenstion.toLowerCase()) {
      return true;
    }

    return false;
  }

  onSubmit() {
    if (this.selectedFile != undefined && this.selectedFile != null) {
      this.fileName = this.selectedFile.name;
      
      if (!this.isJSONFile(this.fileName)) {
        alert("Morate uneti JSON fajl!");
        return;
      }

      const fileReader = new FileReader();
      fileReader.readAsText(this.selectedFile, "UTF-8");
      fileReader.onload = () => {
        alert("fileReader.onload");

        if (fileReader.result) {
          let text = String(fileReader.result);
          if (!this.isValidJSONString(text)) {
            alert("Fajl ne sadr??i validan JSON.");
          }
          let participants = JSON.parse(text);
          if (!Array.isArray(participants)) {
            participants = [participants];
          }

          for (let i = 0; i < participants.length; i++) {
            if (!this.isValidParticipantObject(participants[i])) {
              alert("Uneti JSON ne odgovara sadr??aju objekta takmi??ara.");
              return;
            }
          }

          for (let i = 0; i < participants.length; i++) {
            alert("here");
            this.participantService.addParticipant(
              this.loggedUser.country,
              participants[i].name,
              participants[i].gender,
              participants[i].sport,
              participants[i].discipline).subscribe((data: any) => {});
          }
        }
      }
      fileReader.onerror = (error) => {
        console.log(error);
      }

    } else {
      alert("Morate izabrati fajl");
    }
  }

  isValidParticipantObject(obj: Object) {
    if (!('sport' in obj)) {
      return false;
    }

    if (!('discipline' in obj)) {
      return false;
    }

    if (!('name' in obj)) {
      return false;
    }

    if (!('gender' in obj)) {
      return false;
    }
    return true;
  }

  public onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
    }
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

    this.selectedDiscipline = this.relatedDisciplines[0];
  }

  isValidJSONString(jsonString: string) {
    try {
        JSON.parse(jsonString);
    } catch (e) {
        return false;
    }
    return true;
  }

  addPariticipant() {
    if (this.addParticipantEmptyData()) {
      this.successMessage = "";
      this.errorMessage = "Sva polja moraju biti popunjena";
      return;
    }

    this.participantService.addParticipant(
      this.loggedUser.country,
      this.selectedFirstName + " " + this.selectedLastName,
      this.selectedGender,
      this.selectedSport,
      this.selectedDiscipline).subscribe((data: any) => {
        if (data.message == "other sport") {
          this.successMessage = "";
          this.errorMessage = "Takmi??ar je vec prijavljen za drugi sport.";
        } else if (data.message == "already added") {
          this.successMessage = "";
          this.errorMessage = "Takmi??ar je vec dodat za datu disciplinu.";
        } else if (data.message == "ok") {
          this.errorMessage = "";
          this.successMessage = "Uspesno dodat takmi??ar u datoj disciplini.";
          this.selectedFirstName = "";
          this.selectedLastName = "";
        }
      });
  }

  addParticipantEmptyData() {
    if (this.selectedSport == undefined || this.selectedSport == null  || this.selectedSport == "") {
      return true;
    }

    if (this.selectedDiscipline == undefined || this.selectedDiscipline == null) {
      return true;
    }

    if (this.selectedFirstName == undefined || this.selectedFirstName == null  || this.selectedFirstName == "") {
      return true;
    }

    if (this.selectedLastName == undefined || this.selectedLastName == null  || this.selectedLastName == "") {
      return true;
    }

    if (this.selectedGender == undefined || this.selectedGender == null  || this.selectedGender == "") {
      return true;
    }

    return false;
  }

}
