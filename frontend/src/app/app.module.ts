import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { MedalsComponent } from './medals/medals.component';
import { ParticipantsComponent } from './participants/participants.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrgEditSportsComponent } from './org-edit-sports/org-edit-sports.component';
import { OrgEditCompetitionsComponent } from './org-edit-competitions/org-edit-competitions.component';
import { OrgRecordOverviewComponent } from './org-record-overview/org-record-overview.component';
import { LeadRegisterCompetitorsComponent } from './lead-register-competitors/lead-register-competitors.component';
import { LeadCompetitorsOverviewComponent } from './lead-competitors-overview/lead-competitors-overview.component';
import { OrgEditUsersComponent } from './org-edit-users/org-edit-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    MedalsComponent,
    ParticipantsComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    OrgEditSportsComponent,
    OrgEditCompetitionsComponent,
    OrgRecordOverviewComponent,
    LeadRegisterCompetitorsComponent,
    LeadCompetitorsOverviewComponent,
    OrgEditUsersComponent,
    ChangePasswordComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
