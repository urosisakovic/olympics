import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { MedalsComponent } from './medals/medals.component';
import { ParticipantsComponent } from './participants/participants.component';

const routes: Routes = [
  {path: 'countries', component: CountriesComponent},
  {path: 'medals', component: MedalsComponent},
  {path: 'participants', component: ParticipantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
