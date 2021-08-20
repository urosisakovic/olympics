import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { LoginComponent } from './login/login.component';
import { MedalsComponent } from './medals/medals.component';
import { OrgEditCompetitionsComponent } from './org-edit-competitions/org-edit-competitions.component';
import { OrgEditSportsComponent } from './org-edit-sports/org-edit-sports.component';
import { OrgRecordOverviewComponent } from './org-record-overview/org-record-overview.component';
import { ParticipantsComponent } from './participants/participants.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'countries', component: CountriesComponent},
  {path: 'medals', component: MedalsComponent},
  {path: 'participants', component: ParticipantsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'org-edit-sports', component: OrgEditSportsComponent},
  {path: 'org-edit-competitions', component: OrgEditCompetitionsComponent},
  {path: 'org-record-overview', component: OrgRecordOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
