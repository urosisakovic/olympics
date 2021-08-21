import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCompetitorsOverviewComponent } from './lead-competitors-overview.component';

describe('LeadCompetitorsOverviewComponent', () => {
  let component: LeadCompetitorsOverviewComponent;
  let fixture: ComponentFixture<LeadCompetitorsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCompetitorsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCompetitorsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
