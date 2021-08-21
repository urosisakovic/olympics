import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadRegisterCompetitorsComponent } from './lead-register-competitors.component';

describe('LeadRegisterCompetitorsComponent', () => {
  let component: LeadRegisterCompetitorsComponent;
  let fixture: ComponentFixture<LeadRegisterCompetitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadRegisterCompetitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadRegisterCompetitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
