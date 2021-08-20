import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { LoginComponent } from './login/login.component';
import { MedalsComponent } from './medals/medals.component';
import { OrgEditSportsComponent } from './org-edit-sports/org-edit-sports.component';
import { ParticipantsComponent } from './participants/participants.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'countries', component: CountriesComponent},
  {path: 'medals', component: MedalsComponent},
  {path: 'participants', component: ParticipantsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'org-edit-sports', component: OrgEditSportsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
